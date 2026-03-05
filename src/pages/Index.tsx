import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Portfolio from "@/components/Portfolio";
import Clients from "@/components/Clients";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Services />
      <Projects />
      <Portfolio />
      <Clients />
      <Reviews />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
