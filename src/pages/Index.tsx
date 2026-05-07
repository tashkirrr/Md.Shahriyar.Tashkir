import GridBackground from "@/components/GridBackground";
import FloatingBlobs from "@/components/FloatingBlobs";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import RoadmapSection from "@/components/RoadmapSection";
import ProjectsSection from "@/components/ProjectsSection";
import ToolkitSection from "@/components/ToolkitSection";
import CredentialsSection from "@/components/CredentialsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BlogSection from "@/components/BlogSection";
import ConnectSection from "@/components/ConnectSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import CommandPalette from "@/components/CommandPalette";
import { motion } from "framer-motion";

const revealVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const Section = ({ children, id }: { children: React.ReactNode; id?: string }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={revealVariants}
  >
    {children}
  </motion.div>
);

const Index = () => {
  return (
    <>
      <GridBackground />
      <FloatingBlobs />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative min-h-[100dvh] overflow-x-hidden"
      >
        <Header />
        <main className="relative z-10">
          <HeroSection />
          <Section><AboutSection /></Section>
          <Section><RoadmapSection /></Section>
          <Section><CredentialsSection /></Section>
          <Section><ProjectsSection /></Section>
          <Section><ToolkitSection /></Section>
          <Section><TestimonialsSection /></Section>
          <Section><BlogSection /></Section>
          <Section><ConnectSection /></Section>
        </main>
        <Footer />
        <ScrollToTop />
        <CommandPalette />
      </motion.div>
    </>
  );
};

export default Index;
