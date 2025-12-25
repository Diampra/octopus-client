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
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block bg-primary text-primary-foreground px-4 py-2 text-sm font-bold uppercase tracking-wider mb-4 border-2 border-foreground shadow-sm">
            Our Services
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            What We <span className="text-primary">Offer</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From business cards to large format prints, we deliver quality printing and creative design solutions.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = ICON_MAP[service.icon] ?? CreditCard;

            return (
              <div
                key={service.id}
                className="group bg-card border-2 border-foreground p-6 shadow-sm hover:shadow-md hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
              >
                <div className="w-14 h-14 bg-primary/10 border-2 border-foreground flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon className="w-7 h-7" />
                </div>

                <h3 className="text-xl font-bold mb-2">
                  {service.title}
                </h3>

                <p className="text-muted-foreground mb-4">
                  {service.description}
                </p>

                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
                >
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button variant="default" size="lg" asChild>
            <Link to="/services">
              View All Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
