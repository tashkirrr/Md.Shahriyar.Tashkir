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

const quotes = [
  "Code is like humor. When you have to explain it, it's bad.",
  "Simplicity is the soul of efficiency.",
  "First, solve the problem. Then, write the code.",
  "Make it work, make it right, make it fast.",
  "The best code is no code at all.",
  "Debugging is like being a detective in a crime movie.",
];

const Footer = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((i) => (i + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative z-10 border-t border-border py-12">
      <div className="section-container text-center space-y-6">
        {/* Quote Ticker */}
        <div className="overflow-hidden h-5 flex items-center justify-center">
          <p className="text-xs text-primary/60 italic animate-marquee whitespace-nowrap">
            "{quotes[quoteIndex]}"
          </p>
        </div>

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
