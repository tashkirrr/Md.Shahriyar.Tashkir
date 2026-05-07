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
            <p className="text-foreground/85 leading-relaxed">
              I work across design and development, building technical projects and handling high-impact visual work for organizations. Currently, I'm a Computer Science student at DIU while serving as Director of IT & Graphics at Youth For a Green Earth and Secretary of Graphics at UYFSR. I focus on bridging the gap between creative design and technical logic, with a growing interest in machine learning and data privacy.
            </p>
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
