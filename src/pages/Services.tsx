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
        <section className="bg-background border-b-2 border-foreground py-24 md:py-32 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full text-center pointer-events-none select-none opacity-[0.03]">
            <span className="text-[25vw] font-black uppercase tracking-tighter leading-none text-foreground">
              EXPERTISE
            </span>
          </div>

          <div className="container mx-auto px-4 text-center">
            <span className="inline-block bg-primary text-primary-foreground px-4 py-2 text-sm font-bold uppercase border-2 border-foreground mb-8">
              Our Services
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-bold uppercase tracking-tighter leading-none mb-6">
              Printing & Design <br />
              <span className="text-primary italic font-serif lowercase">Solutions</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto font-medium">
              We deliver high-end printing and creative design services that help your brand stand out from the noise.
            </p>
          </div>
        </section>

        {/* SERVICES SHOWCASE */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 space-y-24 md:space-y-40">
            {loading && (
              <div className="space-y-16 md:space-y-24">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center animate-pulse">
                    <div>
                      <div className="w-14 h-14 bg-muted mb-4" />
                      <div className="h-8 bg-muted w-2/3 mb-4" />
                      <div className="h-4 bg-muted w-full mb-2" />
                      <div className="h-4 bg-muted w-5/6 mb-6" />
                    </div>
                    <div className="h-[400px] bg-muted" />
                  </div>
                ))}
              </div>
            )}

            {services.map((service, index) => {
              const Icon = iconMap[service.icon] ?? Layers;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={service.id}
                  id={service.slug}
                  className={`flex flex-col lg:flex-row gap-12 lg:gap-24 items-center ${
                    !isEven ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* TEXT */}
                  <div className="w-full lg:w-1/2 relative">
                    {/* Massive Background Number */}
                    <div className="absolute -top-16 -left-8 text-[12rem] font-black text-foreground opacity-5 pointer-events-none select-none z-0">
                      0{index + 1}
                    </div>

                    <div className="relative z-10">
                      <div className="w-16 h-16 bg-background border-4 border-foreground text-foreground flex items-center justify-center mb-8">
                        <Icon className="w-8 h-8" />
                      </div>

                      <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter uppercase leading-none">
                        {service.title}
                      </h2>

                      <p className="text-muted-foreground text-xl mb-8 leading-relaxed font-medium">
                        {service.description}
                      </p>

                      <div className="flex flex-wrap gap-3 mb-10">
                        {service.features.map((f, i) => (
                          <div
                            key={i}
                            className="bg-accent border-2 border-foreground px-4 py-2 text-sm font-bold uppercase tracking-wider"
                          >
                            {f}
                          </div>
                        ))}
                      </div>

                      <Button variant="default" size="xl" className="border-2 border-foreground shadow-sm hover:shadow-md transition-all text-lg btn-arrow-hover" asChild>
                        <Link to="/contact">
                          Request Quote <ArrowRight className="w-5 h-5 ml-2 arrow-icon" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* IMAGE */}
                  <div className="w-full lg:w-1/2">
                    <div className="border-4 border-foreground overflow-hidden shadow-sm hover:shadow-md transition-shadow group relative bg-muted aspect-[4/5] md:aspect-square">
                      <img
                        src={service.imageUrl}
                        alt={service.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-primary/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-foreground text-background text-center relative overflow-hidden">
          {/* Background oversized word */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full text-center pointer-events-none select-none opacity-[0.03]">
            <span className="text-[20vw] font-black uppercase tracking-tighter leading-none text-background">
              READY
            </span>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-none mb-6">
              Start Your <span className="text-secondary italic font-serif lowercase">Project</span>
            </h2>
            <p className="text-xl text-background/80 mb-12 max-w-2xl mx-auto font-medium">
              Contact us today for a free consultation and quote. Let's build something exceptional together.
            </p>
            <Button
              variant="default"
              size="xl"
              className="bg-secondary text-secondary-foreground hover:bg-background hover:text-foreground border-2 border-secondary hover:border-foreground transition-colors text-xl btn-arrow-hover px-12"
              asChild
            >
              <Link to="/contact">
                Contact Us Now <ArrowRight className="w-6 h-6 ml-2 arrow-icon" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
