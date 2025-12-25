import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-foreground/70" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-background border-2 border-foreground px-4 py-2 mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="font-medium text-sm uppercase tracking-wider">Premium Printing Services</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-background mb-6 leading-tight">
            Creative Printing &
            <span className="block text-secondary">Branding Solutions</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-background/90 mb-8 max-w-2xl">
            Cards, Banners, UV, Acrylic & More! Transform your brand identity with our professional printing and design services.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">
                Get a Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <Link to="/portfolio">
                View Portfolio
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 mt-12 md:mt-16 max-w-xl">
            <div className="bg-background/10 backdrop-blur-sm border-2 border-background/30 p-4 text-center">
              <span className="block text-3xl md:text-4xl font-bold text-secondary">500+</span>
              <span className="text-background/80 text-sm uppercase tracking-wider">Projects</span>
            </div>
            <div className="bg-background/10 backdrop-blur-sm border-2 border-background/30 p-4 text-center">
              <span className="block text-3xl md:text-4xl font-bold text-secondary">10+</span>
              <span className="text-background/80 text-sm uppercase tracking-wider">Years</span>
            </div>
            <div className="bg-background/10 backdrop-blur-sm border-2 border-background/30 p-4 text-center">
              <span className="block text-3xl md:text-4xl font-bold text-secondary">100%</span>
              <span className="text-background/80 text-sm uppercase tracking-wider">Quality</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-secondary" />
    </section>
  );
};

export default HeroSection;
