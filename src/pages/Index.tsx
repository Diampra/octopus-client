import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import PortfolioPreview from "@/components/home/PortfolioPreview";
import ProcessTimeline from "@/components/home/ProcessTimeline";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";
import { motion } from "framer-motion";

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        
        <FadeIn>
          <ServicesSection />
        </FadeIn>
        
        <FadeIn>
          <WhyChooseUs />
        </FadeIn>
        
        <FadeIn>
          <PortfolioPreview />
        </FadeIn>

        <FadeIn>
          <ProcessTimeline />
        </FadeIn>
        
        <FadeIn>
          <TestimonialsSection />
        </FadeIn>
        
        <FadeIn>
          <CTASection />
        </FadeIn>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
