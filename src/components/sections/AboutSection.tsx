import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Download } from "lucide-react";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="about" className="py-24">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading-display text-3xl sm:text-4xl text-foreground mb-2">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="font-medium text-xs text-muted-foreground mb-8">A bit about my journey</p>

          <div className="bento-item max-w-3xl">
            <div className="text-foreground/85 space-y-4 leading-relaxed">
              <p>Fusing high-performance logic with premium aesthetics. I am a Visual Architect and Systems Engineer focused on bridging the gap between logic-driven Graphic Design and system-level development.</p>
              
              <div className="space-y-1">
                <p className="font-semibold text-primary">Philosophy:</p>
                <p className="italic">"Code is poetry. Design is storytelling."</p>
              </div>

              <div className="space-y-1">
                <p className="font-semibold text-primary">Current Roles:</p>
                <ul className="list-none space-y-1 pl-1">
                  <li>– Director of IT & Graphics @ Youth For a Green Earth</li>
                  <li>– Secretary of Graphics @ UYFSR</li>
                  <li>– B.Sc. Computer Science @ Daffodil International University</li>
                </ul>
              </div>

              <div className="space-y-1">
                <p className="font-semibold text-primary">Technical Focus:</p>
                <ul className="list-none space-y-1 pl-1">
                  <li>– Distributed Systems: Building low-latency stores (Go, RDM-Server)</li>
                  <li>– Visual Identity: Premium branding and organizational UI/UX assets</li>
                  <li>– AI & Logic: Recursive engines and data-driven analysis</li>
                </ul>
              </div>

              <p className="font-medium italic text-primary/80">Always building, always optimizing.</p>
            </div>
            <div className="mt-6">
              <a
                href="resume.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/25 min-h-[44px]"
              >
                <Download size={16} />
                Download CV
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
