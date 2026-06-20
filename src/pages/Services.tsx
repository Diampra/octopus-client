import { useEffect, useRef, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { apiUrl } from "@/constants/constants";
import {
  CreditCard, FileText, Presentation, Palette, Tag, Layers, Megaphone, Package,
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
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    fetch(`${apiUrl}/services`)
      .then((r) => r.json())
      .then(setServices)
      .finally(() => setLoading(false));
  }, []);

  // IntersectionObserver — update active on scroll
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting && entry.intersectionRatio >= 0.4) setActiveIndex(i); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [services]);

  const active = services[activeIndex];
  const ActiveIcon = active ? (iconMap[active.icon] ?? Layers) : Layers;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16 md:pt-20">

        {/* ── PAGE HERO ── */}
        <section className="bg-foreground text-background py-24 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <span className="text-[20vw] font-black uppercase tracking-tighter leading-none text-background/[0.03] whitespace-nowrap">
              EXPERTISE
            </span>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <span className="inline-block bg-primary text-primary-foreground px-4 py-2 text-xs font-bold uppercase tracking-wider mb-6 border-2 border-background">
              [ Services / What We Do ]
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-bold uppercase tracking-tighter leading-[0.9] mb-6">
              Printing & <br />
              <span className="font-serif italic lowercase font-normal text-primary">design</span> <br />
              Solutions
            </h1>
            <p className="text-background/70 text-xl max-w-xl font-medium">
              High-end printing and creative design services that help your brand stand out from the noise.
            </p>
          </div>
        </section>

        {/* ── STICKY LEFT + SCROLL RIGHT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12">

          {/* Sticky Left — active service detail */}
          <div className="hidden lg:block lg:col-span-4 relative border-r border-border">
            <div className="sticky top-[4rem] h-[calc(100vh-4rem)] flex flex-col justify-between px-8 xl:px-12 py-12 overflow-hidden">

              {/* Ghost word */}
              <div className="absolute inset-0 flex items-center pointer-events-none select-none overflow-hidden">
                <span className="text-[10vw] font-black uppercase tracking-tighter leading-none text-foreground/[0.025] whitespace-nowrap">
                  SERVICE
                </span>
              </div>

              <div className="relative z-10 flex flex-col h-full">
                {active ? (
                  <div key={active.id} className="animate-fade-in flex flex-col h-full">
                    {/* Service image */}
                    <div className="aspect-[4/3] w-full overflow-hidden mb-6 bg-muted relative group">
                      <img
                        src={active.imageUrl}
                        alt={active.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-foreground/15" />
                    </div>

                    {/* Icon + counter */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 border-2 border-foreground flex items-center justify-center bg-muted">
                        <ActiveIcon className="w-4 h-4" />
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        {String(activeIndex + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                      </span>
                    </div>

                    <h2 className="text-2xl font-bold tracking-tight mb-3 uppercase leading-tight">{active.title}</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow line-clamp-4">
                      {active.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {active.features.slice(0, 4).map((f, i) => (
                        <span key={i} className="bg-muted text-foreground font-mono px-2 py-1 text-[9px] font-bold uppercase tracking-widest">
                          {f}
                        </span>
                      ))}
                      {active.features.length > 4 && (
                        <span className="text-muted-foreground font-mono text-[9px] font-bold uppercase tracking-widest px-1 py-1">
                          +{active.features.length - 4} more
                        </span>
                      )}
                    </div>

                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 bg-foreground text-background px-5 py-3 text-xs font-bold uppercase tracking-wider hover:bg-foreground/90 transition-colors w-fit group"
                    >
                      Request Quote
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-muted-foreground font-mono text-xs uppercase tracking-widest">
                    Loading services...
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Scrollable Right — service rows */}
          <div className="lg:col-span-8">
            {loading && services.length === 0 ? (
              <div className="space-y-px bg-border">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-32 bg-background animate-pulse" />
                ))}
              </div>
            ) : (
              <>
                {services.map((service, i) => {
                  const Icon = iconMap[service.icon] ?? Layers;
                  const isActive = i === activeIndex;

                  return (
                    <div
                      key={service.id}
                      id={service.slug}
                      ref={(el) => { itemRefs.current[i] = el; }}
                      onClick={() => setActiveIndex(i)}
                      className={`group cursor-pointer border-b border-border transition-colors duration-300 ${
                        isActive ? "bg-foreground text-background" : "hover:bg-muted/30"
                      }`}
                    >
                      {/* Image + text row */}
                      <div className="flex items-stretch">
                        {/* Image thumbnail */}
                        <div className="w-32 md:w-48 shrink-0 overflow-hidden relative">
                          <img
                            src={service.imageUrl}
                            alt={service.title}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                          />
                          <div className={`absolute inset-0 transition-colors ${isActive ? "bg-foreground/30" : "bg-foreground/10"}`} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 px-6 md:px-8 py-7 flex flex-col justify-between">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-3 mb-3">
                                <div className={`w-8 h-8 border flex items-center justify-center transition-colors ${
                                  isActive ? "border-background/40 text-background" : "border-foreground/20 text-foreground"
                                }`}>
                                  <Icon className="w-3.5 h-3.5" />
                                </div>
                                <span className={`font-mono text-[10px] uppercase tracking-widest ${isActive ? "text-background/50" : "text-muted-foreground"}`}>
                                  0{i + 1} / {String(services.length).padStart(2, "0")}
                                </span>
                              </div>
                              <h2 className="text-xl font-bold tracking-tight uppercase mb-2 leading-none">{service.title}</h2>
                              <p className={`text-sm leading-relaxed line-clamp-2 ${isActive ? "text-background/70" : "text-muted-foreground"}`}>
                                {service.description}
                              </p>
                            </div>
                            <ArrowRight className={`w-5 h-5 shrink-0 mt-1 transition-transform group-hover:translate-x-1 ${isActive ? "text-primary" : "text-foreground/15"}`} />
                          </div>

                          {/* Feature tags */}
                          <div className="flex flex-wrap gap-1.5 mt-4">
                            {service.features.slice(0, 3).map((f, fi) => (
                              <span key={fi} className={`font-mono px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest transition-colors ${
                                isActive ? "bg-background/10 text-background" : "bg-muted text-muted-foreground"
                              }`}>
                                {f}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Bottom CTA row */}
                <div className="px-8 py-8 border-t border-border flex items-center justify-between bg-muted/10">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {services.length} services available
                  </span>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-foreground text-background px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-foreground/90 transition-colors group"
                  >
                    Get a Quote <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </>
            )}
          </div>

        </div>

        {/* ── BOTTOM CTA ── */}
        <section className="py-24 bg-foreground text-background relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <span className="text-[18vw] font-black uppercase tracking-tighter leading-none text-background/[0.03] whitespace-nowrap">
              READY
            </span>
          </div>
          <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-none mb-4">
                Start Your <span className="text-primary italic font-serif lowercase">project</span>
              </h2>
              <p className="text-background/70 text-lg max-w-md font-medium">
                Contact us today for a free consultation and quote. Let's build something exceptional together.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-background text-foreground px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-background/90 transition-colors shrink-0 group"
            >
              Contact Us Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>

      </main>

      <Footer />

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.35s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>
    </div>
  );
}
