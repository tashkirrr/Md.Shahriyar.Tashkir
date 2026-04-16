import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Toolkit", href: "#toolkit" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Honors", href: "#honors" },
  { label: "Blog", href: "#blog" },
  { label: "Connect", href: "#contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isLight, setIsLight] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "light";
    }
    return false;
  });
  const [scrolled, setScrolled] = useState(false);
  const [clock, setClock] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[id]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0.1 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", isLight);
    localStorage.setItem("theme", isLight ? "light" : "dark");
  }, [isLight]);

  // Live Dhaka clock
  useEffect(() => {
    const tick = () => {
      setClock(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "Asia/Dhaka",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    setActiveSection(href.slice(1));
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className="sticky top-0 z-[1000] transition-all duration-300 border-b border-border/20 bg-background/80 backdrop-blur-[10px]"
    >
      <div className="section-container flex items-center justify-between h-16">
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); handleNavClick("#hero"); }}
          className="flex items-center gap-2"
        >
          <img src="https://i.postimg.cc/024RWhmB/icon.png" alt="Logo" className="w-8 h-8 rounded" />
        </a>

        {/* Live Clock - visible on all screens */}
        <div className="flex flex-1 mx-2 items-center gap-1.5 md:gap-2 text-[8px] sm:text-[10px] xl:text-xs text-muted-foreground truncate max-w-[150px] sm:max-w-xs md:max-w-[400px]">
          <span className="w-1.5 h-1.5 md:w-2 md:h-2 shrink-0 rounded-full bg-primary animate-led-blink shadow-[0_0_6px_hsl(var(--primary))]" />
          <span className="truncate">Dhaka, Bangladesh • {clock}</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                className={`text-sm transition-colors ${
                  isActive ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <button
            onClick={() => setIsLight(!isLight)}
            className="p-2 rounded-lg text-muted-foreground hover:text-primary transition-colors"
            aria-label="Toggle theme"
          >
            {isLight ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </nav>

        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setIsLight(!isLight)}
            className="p-2 rounded-lg text-muted-foreground"
            aria-label="Toggle theme"
          >
            {isLight ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-foreground min-w-[44px] min-h-[44px] flex items-center justify-center"
            style={{ zIndex: 100 }}
            aria-label="Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden glass-card border-t mx-4 mb-4 rounded-xl p-4"
            style={{ zIndex: 100 }}
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                  className={`block py-3 px-4 transition-colors min-h-[44px] flex items-center ${
                    isActive ? "text-primary font-semibold" : "text-foreground hover:text-primary"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
