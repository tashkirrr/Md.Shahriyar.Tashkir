import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

type SkillTag = {
  name: string;
  level: "Core Competency" | "Current Focus" | "Proficient";
};

const categories: { label: string; skills: SkillTag[] }[] = [
  {
    label: "Core",
    skills: [
      { name: "C", level: "Core Competency" },
      { name: "Python", level: "Core Competency" },
      { name: "SQL", level: "Core Competency" },
      { name: "Algorithm", level: "Core Competency" },
      { name: "OOP", level: "Core Competency" },
    ],
  },
  {
    label: "Engineering & Systems",
    skills: [
      { name: "Linux (Mint)", level: "Core Competency" },
      { name: "Git", level: "Core Competency" },
      { name: "System Design", level: "Current Focus" },
    ],
  },
  {
    label: "Web & Technical Development",
    skills: [
      { name: "TypeScript", level: "Current Focus" },
      { name: "JavaScript (ES6+)", level: "Core Competency" },
      { name: "React", level: "Current Focus" },
      { name: "Next.js", level: "Current Focus" },
      { name: "HTML5", level: "Core Competency" },
      { name: "CSS3", level: "Core Competency" },
      { name: "Tailwind CSS", level: "Core Competency" },
      { name: "Node.js", level: "Current Focus" },
      { name: "FastAPI", level: "Proficient" },
      { name: "MongoDB", level: "Proficient" },
      { name: "NestJS", level: "Proficient" },
    ],
  },
  {
    label: "Visual & Design Engineering",
    skills: [
      { name: "Affinity", level: "Core Competency" },
      { name: "Canva", level: "Proficient" },
      { name: "Adobe Photoshop", level: "Core Competency" },
      { name: "Adobe Illustrator", level: "Core Competency" },
      { name: "Responsive Design", level: "Core Competency" },
    ],
  },
];

const ToolkitSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const handleOutsideClick = () => setActive(null);
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <section id="toolkit" className="py-24">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading-display text-3xl sm:text-4xl text-foreground mb-2">
            <span className="text-gradient">Toolkit</span>
          </h2>
          <p className="text-sm text-muted-foreground mb-12">Technologies and tools I work with.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: ci * 0.1 }}
              className="bento-item"
            >
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-primary text-sm font-semibold">{cat.label}</h3>
              </div>
              <div className="flex flex-wrap gap-2 select-none">
                {cat.skills.map((skill) => (
                  <div key={skill.name} className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActive(active === skill.name ? null : skill.name);
                      }}
                      className={`px-3 py-1.5 rounded-md text-sm transition-all min-h-[44px] min-w-[44px] flex items-center justify-center select-none ${
                        active === skill.name
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                          : "bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary"
                      }`}
                      style={active === skill.name ? { boxShadow: "0 0 20px hsl(var(--primary) / 0.3)" } : {}}
                    >
                      {skill.name}
                    </button>
                    <AnimatePresence>
                      {active === skill.name && (
                        <motion.div
                          onClick={(e) => e.stopPropagation()}
                          initial={{ opacity: 0, y: 5, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 5, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-md bg-card border border-border text-xs text-primary whitespace-nowrap shadow-xl"
                        >
                          {skill.level}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-card border-r border-b border-border rotate-45 -mt-1" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolkitSection;
