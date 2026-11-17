const CACHE_NAME = "tashkir-v2";
const APP_ROOT = self.registration.scope;
const APP_ENTRY = new URL("index.html", APP_ROOT).href;
const PRECACHE_URLS = [
  new URL("./", APP_ROOT).href,
  APP_ENTRY,
  new URL("manifest.json", APP_ROOT).href,
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS).catch(() => undefined))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key.startsWith("tashkir-") && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);
  if (event.request.method !== "GET" || requestUrl.origin !== self.location.origin) {
    return;
  }

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then(async (response) => {
          if (response.ok) {
            await caches.open(CACHE_NAME)
              .then((cache) => cache.put(event.request, response.clone()))
              .catch(() => undefined);
          }
          return response;
        })
        .catch(async () => (await caches.match(event.request)) || (await caches.match(APP_ENTRY)) || Response.error())
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(async (cached) => {
      if (cached) return cached;

      const response = await fetch(event.request);
      if (response.ok) {
        await caches.open(CACHE_NAME)
          .then((cache) => cache.put(event.request, response.clone()))
          .catch(() => undefined);
      }
      return response;
    })
  );
});
