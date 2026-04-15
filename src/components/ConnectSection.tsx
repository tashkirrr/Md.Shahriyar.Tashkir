import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import emailjs from "@emailjs/browser";
import {
  Linkedin, Github, Twitter, PenTool, Facebook, Instagram,
  ExternalLink, Copy, Check, Send, Music, MessageCircle, Download
} from "lucide-react";

const primaryNodes = [
  { icon: Linkedin, label: "Professional Network", href: "https://www.linkedin.com/in/tashkirrr/", color: "from-blue-500 to-blue-700" },
  { icon: Github, label: "Source Code & Repos", href: "https://github.com/tashkirrr", color: "from-gray-400 to-gray-600" },
  { icon: Twitter, label: "Technical Updates", href: "https://x.com/STashkir", color: "from-sky-400 to-sky-600" },
  { icon: PenTool, label: "Technical Writing", href: "https://medium.com/@tashkir2006", color: "from-green-400 to-green-600" },
];

const socialGrid = [
  { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/shahriyar.tashkir/" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/tashkirrr" },
  { icon: MessageCircle, label: "Reddit", href: "https://www.reddit.com/user/Awkward-Effective410/" },
];

interface LanyardData {
  listening_to_spotify: boolean;
  spotify?: {
    song: string;
    artist: string;
    album_art_url: string;
    album: string;
  };
}

const ConnectSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="contact" className="py-24">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading-display text-3xl sm:text-4xl text-foreground mb-2">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-sm text-muted-foreground mb-12">Let's connect and build something together.</p>
        </motion.div>

        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {/* Column 1: Primary Technical Nodes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="h-full flex flex-col"
          >
            <h3 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Professional</h3>
            <div className="flex flex-col flex-1 gap-4">
              {primaryNodes.map((node) => (
                <a
                  key={node.label}
                  href={node.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bento-item flex items-center gap-4 group cursor-pointer flex-1 min-h-[48px]"
                >
                <div className={`p-2.5 rounded-lg bg-gradient-to-br ${node.color} text-white`}>
                  <node.icon size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-foreground text-sm font-semibold">{node.label}</p>
                </div>
                <ExternalLink size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Social + Special */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-full flex flex-col"
          >
            <h3 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Social</h3>
            <div className="flex flex-col flex-1 gap-4">
              {socialGrid.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bento-item flex items-center gap-4 group cursor-pointer flex-1 min-h-[48px]"
                >
                <s.icon size={20} className="text-primary" />
                <span className="text-foreground text-sm font-semibold flex-1">{s.label}</span>
                <ExternalLink size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
            ))}
            <DiscordCard />
            <SpotifyWebSocketCard />
              <ResumeCard />
            </div>
          </motion.div>

          {/* Column 3: Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-2 lg:col-span-1 h-full flex flex-col"
          >
            <h3 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Send a Message</h3>
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const DiscordCard = () => {
  const [copied, setCopied] = useState(false);
  const discordId = "865610520366940200";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(discordId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <TiltCard as="div" className="bento-item flex items-center gap-4 flex-1 min-h-[48px] relative group overflow-hidden">
      <MessageCircle size={20} className="text-primary shrink-0" />
      <span className="text-foreground text-sm font-semibold flex-1">Discord</span>
      
      <div className="flex items-center gap-2 shrink-0">
        <code className="font-mono text-[10px] md:text-xs text-muted-foreground bg-secondary px-2 py-1.5 rounded truncate max-w-[120px] md:max-w-[150px]">
          {discordId}
        </code>
        <button
          onClick={handleCopy}
          className="p-2 rounded-lg bg-secondary hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all flex items-center justify-center shrink-0 min-w-[32px] min-h-[32px]"
          title="Copy to clipboard"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <Check size={14} className="text-primary" />
              </motion.div>
            ) : (
              <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <Copy size={14} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {copied && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.95 }} 
            className="absolute inset-0 bg-card/90 backdrop-blur-sm flex items-center justify-center rounded-xl z-10 border border-primary/20"
          >
            <p className="text-sm font-semibold text-primary font-mono tracking-wide">
              ID Copied!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </TiltCard>
  );
};

const SpotifyWebSocketCard = () => {
  const [data, setData] = useState<LanyardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ws: WebSocket | null = null;
    let heartbeatInterval: ReturnType<typeof setInterval> | null = null;
    let restTimeout: ReturnType<typeof setTimeout> | null = null;

    // Fast REST API fetch with 1s timeout for initial load
    const fetchInitial = async () => {
      const controller = new AbortController();
      restTimeout = setTimeout(() => controller.abort(), 1000); // 1s timeout for Discord/Music
      
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
      ws = new WebSocket("wss://api.lanyard.rest/socket");

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);

        // Opcode 1: Hello — initialize connection
        if (msg.op === 1) {
          ws?.send(JSON.stringify({
            op: 2,
            d: { subscribe_to_id: "865610520366940200" },
          }));

          heartbeatInterval = setInterval(() => {
            ws?.send(JSON.stringify({ op: 3 }));
          }, msg.d.heartbeat_interval);
        }

        // Opcode 0: Event Update
        if (msg.op === 0 && (msg.t === "INIT_STATE" || msg.t === "PRESENCE_UPDATE")) {
          setData(msg.d);
          setIsLoading(false);
        }
      };

      ws.onclose = () => {
        if (heartbeatInterval) clearInterval(heartbeatInterval);
        setTimeout(connect, 3000); // Reconnect after 3s
      };

      ws.onerror = () => ws?.close();
    };

    fetchInitial(); // Fast 1s fetch first
    connect(); // Then WebSocket for real-time updates

    return () => {
      if (restTimeout) clearTimeout(restTimeout);
      if (heartbeatInterval) clearInterval(heartbeatInterval);
      ws?.close();
    };
  }, []);

  const isPlaying = data?.listening_to_spotify;
  const spotify = data?.spotify;

  return (
    <TiltCard as="div" className="bento-item flex flex-col justify-center flex-1 min-h-[160px] overflow-hidden">
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
    </TiltCard>
  );
};

const ResumeCard = () => {
  const handleClick = () => {
    const win = window.open("resume.html", "_blank");
    if (win) {
      win.addEventListener("load", () => {
        win.print();
      });
    }
  };

  return (
    <TiltCard
      as="div"
      className="bento-item flex flex-col justify-center cursor-pointer group flex-1 min-h-[48px]"
      onClick={handleClick}
    >
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-lg bg-primary/20 text-primary">
          <Download size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-foreground text-sm font-semibold">Download Resume</p>
          <p className="text-muted-foreground text-xs mt-1">
            Get my full CV in PDF format
          </p>
        </div>
      </div>
    </TiltCard>
  );
};

const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<string>("Ready to send");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current || sending) return;
    setSending(true);
    setStatus("Sending...");

    try {
      await new Promise((r) => setTimeout(r, 600));
      await emailjs.sendForm("service_ummf1vq", "template_zi1fwbe", formRef.current, "R9ZU_k7JcGlyKhyCQ");
      setStatus("Message sent successfully!");
      formRef.current.reset();
      setTimeout(() => setStatus("Ready to send"), 4000);
    } catch {
      setStatus("Failed to send. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="bento-item flex flex-col justify-between flex-1 space-y-3">
      <input
        type="text"
        name="from_name"
        placeholder="Your Name"
        required
        className="w-full px-4 py-3 rounded-lg bg-secondary/50 text-foreground placeholder:text-muted-foreground border-none focus:ring-1 focus:ring-primary focus:outline-none transition-colors min-h-[44px] text-sm"
        style={{ fontSize: "16px" }}
      />
      <input
        type="email"
        name="from_email"
        placeholder="Your Email"
        required
        className="w-full px-4 py-3 rounded-lg bg-secondary/50 text-foreground placeholder:text-muted-foreground border-none focus:ring-1 focus:ring-primary focus:outline-none transition-colors min-h-[44px] text-sm"
        style={{ fontSize: "16px" }}
      />
      <textarea
        name="message"
        placeholder="Your Message"
        rows={4}
        required
        className="w-full px-4 py-3 rounded-lg bg-secondary/50 text-foreground placeholder:text-muted-foreground border-none focus:ring-1 focus:ring-primary focus:outline-none transition-colors resize-none text-sm flex-1"
        style={{ fontSize: "16px" }}
      />
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-primary/70 truncate">{status}</p>
        <button
          type="submit"
          disabled={sending}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50 min-h-[44px] whitespace-nowrap"
        >
          <Send size={14} />
          Send Message
        </button>
      </div>
    </form>
  );
};

export default ConnectSection;
