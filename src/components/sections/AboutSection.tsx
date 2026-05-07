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
              <p>I work across design and development, mostly building small projects and handling visual work for real organizations.</p>
              
              <div className="space-y-1">
                <p className="font-semibold text-primary">Currently:</p>
                <ul className="list-none space-y-1 pl-1">
                  <li>– Computer Science student at Daffodil International University</li>
                  <li>– Director of IT & Graphics at Youth For a Green Earth</li>
                  <li>– Secretary of Graphics at United Youth Forum of Science and Research (UYFSR).</li>
                </ul>
              </div>

              <div className="space-y-1">
                <p className="font-semibold text-primary">I spend most of my time:</p>
                <ul className="list-none space-y-1 pl-1">
                  <li>– Designing campaign visuals and managing social media identity</li>
                  <li>– Building web projects (portfolio, small tools, ML-based apps)</li>
                  <li>– Writing and exploring topics around machine learning and data privacy</li>
                </ul>
              </div>

              <p>I’ve worked on event campaigns, organizational branding, and a few web-based projects that are live. Lately, I’ve been focusing more on how machine learning can work with data privacy.</p>
              
              <p className="font-medium italic text-primary/80">Still learning, still building...</p>
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
