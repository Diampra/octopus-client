import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-24 md:pt-32 pb-16">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left / Editorial Text */}
          <div className="lg:col-span-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground border-2 border-foreground px-4 py-2 mb-8 shadow-sm">
              <Sparkles className="w-4 h-4" />
              <span className="font-bold text-sm uppercase tracking-widest">Premium Agency</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-bold text-foreground leading-[0.9] tracking-tighter mb-8 uppercase">
              Printing & <br />
              <span className="font-serif italic lowercase text-primary font-normal">branding</span> <br />
              Solutions
            </h1>

            {/* Subheadline & CTA */}
            <div className="flex flex-col md:flex-row gap-8 md:items-center max-w-3xl">
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed flex-1 font-medium">
                We transform your brand identity with high-end printing, bespoke design, and meticulous attention to detail.
              </p>
              
              <div className="flex flex-col gap-4 min-w-[200px]">
                <Button variant="default" size="xl" className="w-full text-lg shadow-sm border-2 border-foreground hover:-translate-y-1 hover:shadow-md transition-all btn-arrow-hover" asChild>
                  <Link to="/contact">
                    Start Project
                    <ArrowRight className="w-5 h-5 ml-2 arrow-icon" />
                  </Link>
                </Button>
                <Button variant="outline" size="xl" className="w-full text-lg shadow-sm hover:-translate-y-1 hover:shadow-md transition-all" asChild>
                  <Link to="/portfolio">
                    View Work
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Right / Accent Images & Stats */}
          <div className="lg:col-span-4 flex flex-col gap-6 mt-12 lg:mt-0">
            <div className="relative aspect-[4/5] border-2 border-foreground overflow-hidden bg-muted shadow-sm hover:shadow-md transition-shadow group">
              <img 
                src={heroBg} 
                alt="Creative Printing" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-primary/20 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-700" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-foreground text-background border-2 border-foreground p-6 text-center hover:bg-secondary hover:text-secondary-foreground transition-colors cursor-default">
                <span className="block text-4xl font-bold mb-1">500+</span>
                <span className="text-xs uppercase tracking-widest font-medium opacity-80">Projects</span>
              </div>
              <div className="bg-background text-foreground border-2 border-foreground p-6 text-center hover:bg-primary hover:text-primary-foreground transition-colors cursor-default">
                <span className="block text-4xl font-bold mb-1">10+</span>
                <span className="text-xs uppercase tracking-widest font-medium opacity-80">Years</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Background oversized word */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -z-10 w-full overflow-hidden pointer-events-none select-none opacity-[0.03]">
        <span className="text-[20vw] font-black uppercase whitespace-nowrap leading-none tracking-tighter">
          CREATIVE
        </span>
      </div>
    </section>
  );
};

export default HeroSection;
