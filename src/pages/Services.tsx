import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { apiUrl } from "@/constants/constants";

import {
  CreditCard,
  FileText,
  Presentation,
  Palette,
  Tag,
  Layers,
  Megaphone,
  Package,
} from "lucide-react";

const iconMap: Record<string, any> = {
  "credit-card": CreditCard,
  "file-text": FileText,
  "presentation": Presentation,
  "palette": Palette,
  "tag": Tag,
  "layers": Layers,
  "megaphone": Megaphone,
  "package": Package,
};

type Service = {
  id: string;
  slug: string;
  title: string;
  description: string;
  features: string[];
  imageUrl: string;
  icon: string;
};

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiUrl}/services`)
      .then((r) => r.json())
      .then(setServices)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16 md:pt-20">
        {/* HERO */}
        <section className="bg-foreground text-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <span className="inline-block bg-secondary text-secondary-foreground px-4 py-2 text-sm font-bold uppercase border-2 border-background mb-4">
              Our Services
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Printing & Design{" "}
              <span className="text-secondary">Solutions</span>
            </h1>
            <p className="text-xl text-background/80 mb-8">
              From business cards to large format prints, we deliver quality
              printing and creative design services that help your brand stand
              out.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">
                Request Quote <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </section>

        {/* SERVICES */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 space-y-16 md:space-y-24">
            {loading && (
              <p className="text-center text-muted-foreground">
                Loading services…
              </p>
            )}

            {services.map((service, index) => {
              const Icon = iconMap[service.icon] ?? Layers;

              return (
                <div
                  key={service.id}
                  id={service.slug}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* TEXT */}
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="w-14 h-14 bg-primary text-primary-foreground border-2 border-foreground flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7" />
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      {service.title}
                    </h2>

                    <p className="text-muted-foreground text-lg mb-6">
                      {service.description}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                      {service.features.map((f, i) => (
                        <div
                          key={i}
                          className="bg-accent border-2 border-border px-3 py-2 text-sm font-medium"
                        >
                          {f}
                        </div>
                      ))}
                    </div>

                    <Button variant="default" size="lg" asChild>
                      <Link to="/contact">
                        Get Quote <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>

                  {/* IMAGE */}
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <div className="border-2 border-foreground shadow-md overflow-hidden">
                      <img
                        src={service.imageUrl}
                        alt={service.title}
                        className="w-full aspect-[4/3] object-cover"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-primary text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation and quote.
          </p>
          <Button
            variant="heroOutline"
            size="xl"
            className="bg-background text-foreground"
            asChild
          >
            <Link to="/contact">
              Contact Us Now <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
}
