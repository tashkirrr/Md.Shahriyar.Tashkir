import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";

const sections = [
  { label: "About", href: "#about" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Projects", href: "#projects" },
  { label: "Toolkit", href: "#toolkit" },
  { label: "Credentials", href: "#credentials" },
  { label: "Blog", href: "#blog" },
  { label: "Connect", href: "#contact" },
];

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);

  const filtered = sections.filter((s) =>
    s.label.toLowerCase().includes(query.toLowerCase())
  );

  const navigate = useCallback((href: string) => {
    setOpen(false);
    setQuery("");
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
        setQuery("");
        setSelected(0);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      } else if (e.key === "Enter" && filtered[selected]) {
        navigate(filtered[selected].href);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, filtered, selected, navigate]);

  useEffect(() => setSelected(0), [query]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-start justify-center pt-[20vh] px-4"
          onClick={() => setOpen(false)}
        >
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg glass-card border rounded-xl overflow-hidden shadow-2xl"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
              <Search size={16} className="text-muted-foreground" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search sections..."
                className="flex-1 bg-transparent text-foreground text-sm placeholder:text-muted-foreground focus:outline-none"
                style={{ fontSize: "16px" }}
              />
              <kbd className="hidden sm:inline-block px-2 py-0.5 rounded text-xs text-muted-foreground bg-secondary">
                ESC
              </kbd>
            </div>
            <div className="max-h-64 overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <p className="text-muted-foreground text-sm text-center py-6">No results found.</p>
              ) : (
                filtered.map((s, i) => (
                  <button
                    key={s.href}
                    onClick={() => navigate(s.href)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-colors min-h-[44px] ${
                      i === selected
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    <span>{s.label}</span>
                    <ArrowRight size={14} className="text-muted-foreground" />
                  </button>
                ))
              )}
            </div>
            <div className="px-4 py-2 border-t border-border flex items-center gap-4 text-xs text-muted-foreground">
              <span>↑↓ Navigate</span>
              <span>↵ Select</span>
              <span>ESC Close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
