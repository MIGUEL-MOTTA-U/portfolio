import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Experience } from "./components/Experience";
import { Services } from "./components/Services";
import { TechStack } from "./components/TechStack";
import { Projects } from "./components/Projects";
import { EducationCertifications } from "./components/EducationCertifications";
import { AISection } from "./components/AISection";
import { CloudDevOps } from "./components/CloudDevOps";
import { Testimonials } from "./components/Testimonials";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Experience />
      <Services />
      <TechStack />
      <Projects />
      <EducationCertifications />
      <AISection />
      <CloudDevOps />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  );
}
