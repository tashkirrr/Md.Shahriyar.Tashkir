import { useState, useEffect } from "react";
import { Music } from "lucide-react";

interface LanyardData {
  listening_to_spotify: boolean;
  discord_status?: string;
  spotify?: {
    song: string;
    artist: string;
    album_art_url: string;
    album: string;
  };
}

const SpotifyCard = () => {
  const [data, setData] = useState<LanyardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ws: WebSocket | null = null;
    let heartbeatInterval: ReturnType<typeof setInterval> | null = null;
    let restTimeout: ReturnType<typeof setTimeout> | null = null;
    let reconnectTimeout: ReturnType<typeof setTimeout> | null = null;
    let restController: AbortController | null = null;
    let isMounted = true;
    let retryAttempt = 0;

    const fetchInitial = async () => {
      restController = new AbortController();
      restTimeout = setTimeout(() => restController?.abort(), 8000);

      try {
        const r = await fetch("https://api.lanyard.rest/v1/users/865610520366940200", {
          signal: restController.signal,
        });

        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const json = await r.json();
        if (isMounted && json.success) setData(json.data);
      } catch (e) {
        if (isMounted) console.error("Lanyard REST Error:", e);
      } finally {
        if (restTimeout) clearTimeout(restTimeout);
        if (isMounted) setIsLoading(false);
      }
    };

    const connect = () => {
      ws = new WebSocket("wss://api.lanyard.rest/socket");

      ws.onmessage = (event) => {
        if (!isMounted) return;
        let msg: any;
        try {
          msg = JSON.parse(event.data);
        } catch (error) {
          console.error("Invalid Lanyard WebSocket message:", error);
          return;
        }

        if (msg.op === 1) {
          ws?.send(JSON.stringify({
            op: 2,
            d: { subscribe_to_id: "865610520366940200" },
          }));

          const heartbeatIntervalMs = Number(msg.d?.heartbeat_interval);
          if (heartbeatIntervalMs > 0) {
            heartbeatInterval = setInterval(() => {
              if (ws?.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ op: 3 }));
              }
            }, heartbeatIntervalMs);
          }
        }

        if (msg.op === 0 && (msg.t === "INIT_STATE" || msg.t === "PRESENCE_UPDATE")) {
          retryAttempt = 0;
          setData(msg.d);
          setIsLoading(false);
        }
      };

      ws.onclose = () => {
        if (heartbeatInterval) clearInterval(heartbeatInterval);
        if (reconnectTimeout) clearTimeout(reconnectTimeout);
        if (!isMounted) return;
        const delay = Math.min(30000, 3000 * 2 ** retryAttempt);
        retryAttempt += 1;
        reconnectTimeout = setTimeout(connect, delay);
      };

      ws.onerror = () => ws?.close();
    };

    fetchInitial();
    connect();

    return () => {
      isMounted = false;
      if (restController) restController.abort();
      if (restTimeout) clearTimeout(restTimeout);
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
      if (heartbeatInterval) clearInterval(heartbeatInterval);
      if (ws) {
        ws.onclose = null;
        ws.close();
      }
    };
  }, []);

  const isPlaying = data?.listening_to_spotify;
  const spotify = data?.spotify;
  const isOffline = data?.discord_status === "offline";

  return (
    <div className="bento-item flex flex-col justify-center flex-1 min-h-[160px] overflow-hidden">
      <div className="flex items-center gap-3 h-full">
        {isLoading ? (
          <div className="flex items-center gap-3 text-muted-foreground">
            <Music size={20} className="text-primary/50 animate-pulse" />
            <span className="text-sm">Connecting to Lanyard...</span>
          </div>
        ) : isPlaying && spotify ? (
          <>
            <div className="relative shrink-0">
              <img
                src={spotify.album_art_url}
                alt={spotify.album}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-led-blink shadow-[0_0_8px_hsl(var(--primary))]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-primary mb-1 font-medium">Now Playing</p>
              <p className="text-foreground text-sm font-semibold truncate">{spotify.song}</p>
              <p className="text-muted-foreground text-xs truncate">{spotify.artist}</p>
            </div>
          </>
        ) : isOffline ? (
          <div className="flex items-center gap-3 text-muted-foreground opacity-70">
            <div className="p-2.5 rounded-lg bg-secondary text-muted-foreground/50">
              <Music size={20} />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-muted-foreground/60">Discord Offline</p>
              <p className="text-sm">Status not available</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 text-muted-foreground">
            <div className="p-2.5 rounded-lg bg-primary/10 text-primary/50">
              <Music size={20} />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-primary/70">Discord Online</p>
              <p className="text-sm">Not listening to Spotify</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpotifyCard;
