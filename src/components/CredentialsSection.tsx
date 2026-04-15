import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Award, ExternalLink, Trophy, Cpu } from "lucide-react";
import TiltCard from "@/components/ui/tilt-card";

const honors = [
  { icon: Trophy, title: "Divisional Round Champion", desc: "ICT Olympiad Bangladesh (2022)" },
  { icon: Cpu, title: "AI for Bangladesh Summit", desc: "Certified in emerging AI competencies (2025)" },
  { icon: Award, title: "General Secretary", desc: "ACPS IT Club (2022–2023)" },
];

const CredentialsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-24">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading-display text-3xl sm:text-4xl text-foreground mb-2">
            Honors & <span className="text-gradient">Accolades</span>
          </h2>
          <p className="font-mono text-xs text-muted-foreground mb-12">// achievements.highlight()</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {honors.map((h, i) => (
            <TiltCard
              key={h.title}
              as="div"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bento-item text-center"
            >
              <h.icon size={28} className="text-primary mx-auto mb-3" />
              <h3 className="font-display font-bold text-foreground">{h.title}</h3>
              <p className="text-muted-foreground text-sm mt-1">{h.desc}</p>
            </TiltCard>
          ))}
        </div>

        {/* Credentials Archive Card */}
        <TiltCard
          as="div"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bento-item glow-border max-w-2xl mx-auto text-center"
        >
          <h3 className="font-display font-bold text-foreground text-xl mb-2">
            Comprehensive Credentials & Archives
          </h3>
          <p className="text-muted-foreground text-sm mb-6">
            A complete collection of my academic documents, certificates, and detailed credential history.
          </p>
          <MagneticButton />
        </TiltCard>
      </div>
    </section>
  );
};

const MagneticButton = () => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.15);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.15);
  };

  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={ref}
      href="https://drive.google.com/drive/folders/1NWgWvzQ83jAd7y7BkNsttcO0vAQIbrtA?usp=drive_link"
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm transition-shadow hover:shadow-lg hover:shadow-primary/30 min-h-[44px]"
    >
      View Archives <ExternalLink size={14} />
    </motion.a>
  );
};

export default CredentialsSection;
