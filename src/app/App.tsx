import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { TechStack } from "./components/TechStack";
import { Projects } from "./components/Projects";
import { AISection } from "./components/AISection";
import { CloudDevOps } from "./components/CloudDevOps";
import { Testimonials } from "./components/Testimonials";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-[#00000] text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />
      <Hero />
      <Services />
      <TechStack />
      <Projects />
      <AISection />
      <CloudDevOps />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  );
}
