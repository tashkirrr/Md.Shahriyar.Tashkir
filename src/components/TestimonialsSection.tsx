import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";
import TiltCard from "@/components/ui/tilt-card";

const testimonials = [
  {
    name: "Creative Collaborator",
    role: "Design Industry",
    text: "Shahriyar's design sensibility is unparalleled — he transforms abstract ideas into visual masterpieces with precision and creativity.",
  },
  {
    name: "Academic Peer",
    role: "CSE Department, DIU",
    text: "His transition from design to engineering is seamless. He brings a unique perspective to problem-solving that combines aesthetics with logic.",
  },
  {
    name: "Community Leader",
    role: "Youth for a Green Earth",
    text: "An exceptional organizer who led our COP 29 seminar with passion. His technical skills combined with advocacy make him a rare talent.",
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="testimonials" className="py-24">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading-display text-3xl sm:text-4xl text-foreground mb-2">
            What People <span className="text-gradient">Say</span>
          </h2>
          <p className="text-sm text-muted-foreground mb-12">What people say about working with me.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TiltCard
              key={t.name}
              as="div"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -5 }}
              className="bento-item relative"
            >
              <Quote size={24} className="text-primary/20 mb-4" />
              <p className="text-foreground/80 text-sm leading-relaxed mb-6 italic">
                "{t.text}"
              </p>
              <div className="mt-auto">
                <p className="font-display font-bold text-foreground text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
