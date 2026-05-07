import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import TiltCard from "@/components/ui/tilt-card";

const milestones = [
  { year: "2021", title: "Campus Ambassador", desc: "Frame The Moment 2.0 — Photography & Visual Arts" },
  { year: "2022", title: "Divisional Champion", desc: "ICT Olympiad Bangladesh — National Recognition" },
  { year: "2022–23", title: "General Secretary", desc: "ACPS IT Club — Leading technical innovation & digital literacy" },
  { year: "2023", title: "SSC Science (5.00)", desc: "Adamjee Cantonment Public School — Early tech leadership" },
  { year: "2024", title: "IT & Graphics Director", desc: "Youth For a Green Earth — Shaping organization visual identity" },
  { year: "2025", title: "HSC Science (4.50)", desc: "Adamjee Cantonment College — Professional Graphic Design" },
  { year: "2025", title: "Secretary of Graphics", desc: "UYFSR — Designing official organizational branding" },
  { year: "2026–Present", title: "B.Sc. in CSE", desc: "Daffodil International University (DIU)" },
];

const RoadmapSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="roadmap" className="py-24">
      <div className="section-container max-w-4xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="heading-display text-3xl sm:text-4xl text-foreground mb-2">
            My <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-sm text-muted-foreground">The path that brought me here.</p>
        </motion.div>

        <div className="relative pl-8 sm:pl-12 border-l border-primary/20 space-y-12 ml-4">
          {milestones.map((m, i) => (
            <TimelineItem key={i} milestone={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TimelineItem = ({ milestone, index }: { milestone: typeof milestones[0]; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      {/* Dot */}
      <div className="absolute -left-[37px] sm:-left-[53px] top-1 w-4 h-4 rounded-full bg-background border-2 border-primary z-10">
        <div className="absolute inset-1 rounded-full bg-primary animate-pulse" />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
        <span className="font-mono text-primary text-xs font-bold shrink-0">{milestone.year}</span>
        <div>
          <h3 className="font-display font-bold text-foreground text-lg leading-tight">{milestone.title}</h3>
          <p className="text-muted-foreground text-sm mt-1 leading-relaxed">{milestone.desc}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default RoadmapSection;
