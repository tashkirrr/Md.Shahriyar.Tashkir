import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import TiltCard from "@/components/ui/tilt-card";

const milestones = [
  { year: "2022", title: "Divisional Round Champion", desc: "ICT Olympiad Bangladesh" },
  { year: "2022–23", title: "General Secretary", desc: "ACPS IT Club — Leadership & Campus IT Festivals" },
  { year: "2023", title: "SSC Graduate (Science)", desc: "Adamjee Cantonment Public School — GPA 5.00" },
  { year: "2024", title: "COP 29 Organizer", desc: '"Youth for a Green Earth" — Shaping Climate Demands' },
  { year: "2025", title: "HSC Graduate (Science)", desc: "Adamjee Cantonment College — GPA 4.50" },
  { year: "2025", title: "AI for Bangladesh Summit", desc: "Certified in emerging AI competencies" },
  { year: "2026–Present", title: "B.Sc. in CSE", desc: "Daffodil International University (DIU)" },
];

const RoadmapSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="roadmap" className="py-24">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading-display text-3xl sm:text-4xl text-foreground mb-2">
            My <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-sm text-muted-foreground mb-12">The path that brought me here.</p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-accent/30 to-transparent" />

          {milestones.map((m, i) => {
            const isLeft = i % 2 === 0;
            return (
              <TimelineItem key={i} milestone={m} index={i} isLeft={isLeft} />
            );
          })}
        </div>
      </div>
    </section>
  );
};

const TimelineItem = ({ milestone, index, isLeft }: { milestone: typeof milestones[0]; index: number; isLeft: boolean }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex items-start mb-8 md:mb-12 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      } flex-row`}
    >
      {/* Dot */}
      <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background transform -translate-x-1/2 mt-2 z-10" />

      {/* Content */}
      <div className={`ml-10 md:ml-0 md:w-1/2 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
        <TiltCard className="bento-item">
          <span className="font-mono text-primary text-xs font-semibold">{milestone.year}</span>
          <h3 className="font-display font-bold text-foreground mt-1">{milestone.title}</h3>
          <p className="text-muted-foreground text-sm mt-1">{milestone.desc}</p>
        </TiltCard>
      </div>
    </motion.div>
  );
};

export default RoadmapSection;
