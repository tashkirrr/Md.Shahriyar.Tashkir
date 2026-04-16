import NeuralBackground from "@/components/NeuralBackground";
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

const Index = () => {
  return (
    <div className="relative min-h-[100dvh]">
      <NeuralBackground />
      <Header />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <RoadmapSection />
        <CredentialsSection />
        <ProjectsSection />
        <ToolkitSection />
        <TestimonialsSection />
        <BlogSection />
        <ConnectSection />
      </main>
      <Footer />
      <ScrollToTop />
      <CommandPalette />
    </div>
  );
};

export default Index;
