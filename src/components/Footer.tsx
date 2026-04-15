import { useEffect, useState } from "react";
import { Github, Linkedin, Facebook, Instagram, Mail, PenTool } from "lucide-react";

const socials = [
  { icon: Mail, href: "mailto:tashkir2006@gmail.com", label: "Email" },
  { icon: Linkedin, href: "https://linkedin.com/in/tashkirrr", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/tashkirrr", label: "GitHub" },
  { icon: PenTool, href: "https://medium.com/@tashkir2006", label: "Medium" },
  { icon: Facebook, href: "https://facebook.com/shahriyar.tashkir/", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com/tashkirrr", label: "Instagram" },
];

const logMessages = [
  "[SYSTEM] Fetching GitHub commits... SUCCESS",
  "[API] Medium feed synced // 3 articles loaded",
  "[SYSTEM] Lanyard WebSocket heartbeat... OK",
  "[USER] Session active from Dhaka, BD",
  "[SYSTEM] Portfolio engine V23.0 running",
  "[API] EmailJS service connected // ready",
  "[SYSTEM] GLOBAL_NAV_PERSISTENCE_ACTIVE | ALL_NODES_SYNCED_V23.0",
  "[SYSTEM] CV_STATIC_ROUTING_ACTIVE",
  "[SYSTEM] REPOSITORY_SYNC_COMPLETE",
];

const Footer = () => {
  const [logIndex, setLogIndex] = useState(0);
  const [uptime, setUptime] = useState("00:00:00");

  useEffect(() => {
    const interval = setInterval(() => {
      setLogIndex((i) => (i + 1) % logMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Session uptime
  useEffect(() => {
    const start = Date.now();
    const tick = () => {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      const h = String(Math.floor(elapsed / 3600)).padStart(2, "0");
      const m = String(Math.floor((elapsed % 3600) / 60)).padStart(2, "0");
      const s = String(elapsed % 60).padStart(2, "0");
      setUptime(`${h}:${m}:${s}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="relative z-10 border-t border-border py-12">
      <div className="section-container text-center space-y-6">
        {/* System Log Ticker */}
        <div className="overflow-hidden h-5 flex items-center">
          <p className="font-mono text-xs text-primary/40 animate-marquee whitespace-nowrap">
            {logMessages[logIndex]}
          </p>
        </div>

        {/* Session Uptime */}
        <p className="font-mono text-xs text-muted-foreground/50">
          SESSION_UPTIME: {uptime}
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="p-3 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <s.icon size={20} />
            </a>
          ))}
        </div>
        <p className="text-muted-foreground text-sm">
          © 2026 Mohammad Shahriyar Tashkir. Designed by Shahriyar Tashkir.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
