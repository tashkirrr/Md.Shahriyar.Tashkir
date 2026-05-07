// Layout Components
import GridBackground from "@/components/layout/GridBackground";
import FloatingBlobs from "@/components/layout/FloatingBlobs";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SecurityProvider from "@/components/layout/SecurityProvider";

// Section Components
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import RoadmapSection from "@/components/sections/RoadmapSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ToolkitSection from "@/components/sections/ToolkitSection";
import CredentialsSection from "@/components/sections/CredentialsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import BlogSection from "@/components/sections/BlogSection";
import ConnectSection from "@/components/sections/ConnectSection";

// Common Components
import ScrollToTop from "@/components/common/ScrollToTop";
import CommandPalette from "@/components/common/CommandPalette";

import { motion } from "framer-motion";

const revealVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" }
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
    <SecurityProvider>
      <GridBackground />
      <FloatingBlobs />
      <div className="relative min-h-[100dvh] overflow-x-hidden" style={{ zIndex: 10 }}>
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
      </div>
    </SecurityProvider>
  );
};

export default Index;
