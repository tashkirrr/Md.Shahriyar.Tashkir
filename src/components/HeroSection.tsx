import { motion } from "framer-motion";
import { Github } from "lucide-react";

const HeroSection = () => {

  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center pt-20 pb-16">
      <div className="section-container w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <p className="font-medium text-primary text-sm">Hello, I'm</p>
            <h1 className="heading-display text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight">
              Creative<br />
              <span className="text-gradient">Developer</span>
            </h1>
            <p className="text-lg sm:text-xl text-foreground/90">
              Designing Visuals. Coding Logic. Driving Impact.
            </p>
            <p className="text-muted-foreground max-w-lg">
              From 4+ years of professional Graphic Design to Computer Science &amp; Engineering at Daffodil International University (DIU).
            </p>

            {/* Personal Note */}
            <motion.blockquote
              className="border-l-2 border-primary/40 pl-4 text-foreground/70 text-sm italic leading-relaxed"
              style={{ transform: "perspective(1000px) translateZ(40px)" }}
            >
              "I don't see a boundary between a pixel and a line of code. To me, they're both tools I use to build things that matter."
            </motion.blockquote>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/tashkirrr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-secondary text-foreground font-semibold text-sm transition-all hover:scale-105 hover:bg-primary/10 min-h-[44px]"
              >
                <Github size={16} /> View My Work
              </a>
            </div>

            <div className="space-y-3 border-l-2 border-primary/30 pl-4">
              <blockquote className="text-foreground/80 text-sm italic">
                <span className="font-semibold text-primary/80">On Programming:</span> "Talk is cheap. Show me the code." — <span className="font-semibold">Linus Torvalds</span>
              </blockquote>
              <blockquote className="text-foreground/80 text-sm italic">
                <span className="font-semibold text-accent/80">On Design:</span> "Simplicity is the ultimate sophistication." — <span className="font-semibold">Leonardo da Vinci</span>
              </blockquote>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary/40 to-accent/40 blur-lg animate-glow-pulse" />
              <div className="relative rounded-2xl overflow-hidden border border-primary/20" style={{ clipPath: "polygon(0 4%, 4% 0, 96% 0, 100% 4%, 100% 96%, 96% 100%, 4% 100%, 0 96%)" }}>
                <img
                  src="https://i.postimg.cc/2SjbXPfd/image.jpg"
                  alt="Mohammad Shahriyar Tashkir"
                  className="w-64 h-80 sm:w-72 sm:h-96 object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
