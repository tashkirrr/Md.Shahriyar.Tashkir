import { useState, useEffect } from "react";
import { Music } from "lucide-react";

interface LanyardData {
  listening_to_spotify: boolean;
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

    const fetchInitial = async () => {
      const controller = new AbortController();
      restTimeout = setTimeout(() => controller.abort(), 1000);
      
      try {
        const r = await fetch("https://api.lanyard.rest/v1/users/865610520366940200", {
          signal: controller.signal
        });
        clearTimeout(restTimeout);
        
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const json = await r.json();
        if (json.success) setData(json.data);
      } catch (e) {
        console.error("Lanyard REST Error:", e);
      } finally {
        setIsLoading(false);
      }
    };

    const connect = () => {
      let isMounted = true;
      ws = new WebSocket("wss://api.lanyard.rest/socket");

      ws.onmessage = (event) => {
        if (!isMounted) return;
        const msg = JSON.parse(event.data);

        if (msg.op === 1) {
          ws?.send(JSON.stringify({
            op: 2,
            d: { subscribe_to_id: "865610520366940200" },
          }));

          heartbeatInterval = setInterval(() => {
            if (ws?.readyState === WebSocket.OPEN) {
              ws?.send(JSON.stringify({ op: 3 }));
            }
          }, msg.d.heartbeat_interval);
        }

        if (msg.op === 0 && (msg.t === "INIT_STATE" || msg.t === "PRESENCE_UPDATE")) {
          setData(msg.d);
          setIsLoading(false);
        }
      };

      ws.onclose = () => {
        isMounted = false;
        if (heartbeatInterval) clearInterval(heartbeatInterval);
        setTimeout(() => {
          if (ws?.readyState === WebSocket.CLOSED) connect();
        }, 3000);
      };

      ws.onerror = () => ws?.close();
    };

    fetchInitial();
    connect();

    return () => {
      if (restTimeout) clearTimeout(restTimeout);
      if (heartbeatInterval) clearInterval(heartbeatInterval);
      if (ws) {
        ws.onclose = null;
        ws.close();
      }
    };
  }, []);

  const isPlaying = data?.listening_to_spotify;
  const spotify = data?.spotify;

  return (
    <div className="bento-item flex flex-col justify-center flex-1 min-h-[160px] overflow-hidden">
      <div className="flex items-center gap-3 h-full">
        {isLoading ? (
          <div className="flex items-center gap-3 text-muted-foreground">
            <Music size={20} className="text-primary/50 animate-pulse" />
            <span className="text-sm">Loading Spotify status...</span>
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
        ) : (
          <div className="flex items-center gap-3 text-muted-foreground">
            <Music size={20} className="text-primary/50" />
            <span className="text-sm">Not listening to anything right now</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpotifyCard;
