import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CreditCard,
  FileText,
  Presentation,
  Palette,
  Tag,
  Layers,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiUrl } from "@/constants/constants";

type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

const ICON_MAP: Record<string, any> = {
  "credit-card": CreditCard,
  "file-text": FileText,
  presentation: Presentation,
  palette: Palette,
  tag: Tag,
  layers: Layers,
};

const ServicesSection = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetch(`${apiUrl}/services/featured`)
      .then((res) => res.json())
      .then(setServices)
      .catch(console.error);
  }, []);

  return (
    <section className="py-24 bg-background overflow-hidden relative">
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="inline-block text-primary font-mono text-sm uppercase tracking-widest mb-4">
              [ 01 / Expertise ]
            </span>
            <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tighter leading-none">
              What We <span className="text-primary italic font-serif lowercase">offer</span>
            </h2>
          </div>
          <Button variant="outline" size="lg" className="border-2 border-foreground hover:bg-foreground hover:text-background transition-all shrink-0" asChild>
            <Link to="/services">
              View All Services
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[250px]">
          {services.map((service, index) => {
            const Icon = ICON_MAP[service.icon] ?? CreditCard;
            
            // Bento Grid Logic
            // 0: Large (2x2)
            // 1: Wide (2x1)
            // 2: Tall (1x2)
            // Others: Normal (1x1 or 2x1 based on remaining)
            
            let gridClasses = "col-span-1 row-span-1";
            let bgClass = "bg-card text-card-foreground";
            let iconBgClass = "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground";
            
            if (index === 0) {
              gridClasses = "md:col-span-2 lg:col-span-2 row-span-2";
              bgClass = "bg-foreground text-background";
              iconBgClass = "bg-secondary text-secondary-foreground";
            } else if (index === 1) {
              gridClasses = "md:col-span-1 lg:col-span-2 row-span-1";
              bgClass = "bg-primary text-primary-foreground";
              iconBgClass = "bg-background/20 text-background";
            } else if (index === 2) {
              gridClasses = "md:col-span-1 lg:col-span-1 row-span-2";
              bgClass = "bg-secondary text-secondary-foreground";
              iconBgClass = "bg-background/20 text-background group-hover:bg-background group-hover:text-secondary";
            } else if (index === 3) {
              gridClasses = "md:col-span-2 lg:col-span-1 row-span-1";
            } else if (index === 4) {
               gridClasses = "md:col-span-1 lg:col-span-2 row-span-1";
            }

            return (
              <div
                key={service.id}
                className={`group border-2 border-foreground p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${gridClasses} ${bgClass}`}
              >
                <div>
                  <div className={`w-14 h-14 border-2 border-current flex items-center justify-center mb-6 transition-colors ${iconBgClass}`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className={`font-bold mb-3 ${index === 0 ? 'text-4xl' : 'text-2xl'}`}>
                    {service.title}
                  </h3>

                  <p className={`opacity-80 line-clamp-3 ${index === 0 ? 'text-lg max-w-md' : 'text-sm'}`}>
                    {service.description}
                  </p>
                </div>

                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-wider hover:gap-4 transition-all mt-6"
                >
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
