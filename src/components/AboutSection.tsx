import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Download } from "lucide-react";
import TiltCard from "@/components/ui/tilt-card";

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

          <TiltCard className="bento-item max-w-3xl">
            {/* About Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-3 rounded-lg bg-secondary/50">
                <p className="font-medium text-xs text-primary mb-1">Visual Designer</p>
                <p className="text-foreground/85 text-sm">4+ years in branding/UI (Adobe/Affinity)</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/50">
                <p className="font-medium text-xs text-primary mb-1">CS Student</p>
                <p className="text-foreground/85 text-sm">B.Sc. in CSE @ DIU</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/50">
                <p className="font-medium text-xs text-primary mb-1">Climate Advocate</p>
                <p className="text-foreground/85 text-sm">Youth for Green Earth (COP 29)</p>
              </div>
            </div>

            <p className="text-foreground/85 leading-relaxed">
              Starting from Adamjee Cantonment Public School as IT Club General Secretary to 4+ years as a professional Graphic Designer (Adobe/Affinity Suite). Science graduate from Adamjee Cantonment College (SSC 5.00, HSC 4.50). Currently focusing all energy on B.Sc. in Computer Science at DIU while staying active in climate advocacy with UYFSR and Youth for a Green Earth.
            </p>
            <div className="mt-6">
              <a
                href="https://drive.google.com/uc?export=download&id=1ZdSN_qd2Tg7R5s_VOpjWocqRGy62ur54"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/25 min-h-[44px]"
              >
                <Download size={16} />
                Download CV
              </a>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
