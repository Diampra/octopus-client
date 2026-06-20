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
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetch(`${apiUrl}/services/featured`)
      .then((res) => res.json())
      .then(setServices)
      .catch(console.error);
  }, []);

  if (!services.length) return null;

  const active = services[activeIndex];
  const ActiveIcon = ICON_MAP[active?.icon] ?? CreditCard;

  return (
    <section className="bg-background relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12">

        {/* ── STICKY LEFT — header + active service detail ── */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-0 h-auto lg:h-screen flex flex-col justify-center px-6 xl:px-16 py-16 lg:py-24 overflow-hidden">

            {/* Ghost word */}
            <div className="absolute inset-0 flex items-center pointer-events-none select-none overflow-hidden">
              <span className="text-[14vw] font-black uppercase tracking-tighter leading-none text-foreground/[0.03] whitespace-nowrap">
                SERVICES
              </span>
            </div>

            <div className="relative z-10">
              {/* Label */}
              <span className="inline-block bg-foreground text-background px-4 py-2 text-xs font-bold uppercase tracking-wider mb-6 border-2 border-foreground">
                [ 01 / Core Capabilities ]
              </span>

              {/* Section headline */}
              <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tighter leading-[0.9] mb-6">
                What We <br />
                <span className="font-serif italic lowercase font-normal text-primary">
                  do
                </span>
              </h2>

              {/* Divider */}
              <div className="w-12 h-px bg-foreground/20 mb-8" />

              {/* Active service detail — animated */}
              {active && (
                <div key={active.id} className="animate-fade-in">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-11 h-11 border-2 border-foreground flex items-center justify-center bg-muted">
                      <ActiveIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-0.5">
                        0{activeIndex + 1} / {String(services.length).padStart(2, "0")}
                      </p>
                      <h3 className="text-2xl font-bold tracking-tight">
                        {active.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-8 text-base max-w-sm">
                    {active.description}
                  </p>

                  <Link
                    to="/services"
                    className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest border-b-2 border-foreground pb-1 hover:text-primary hover:border-primary transition-colors group"
                  >
                    View All Services
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── RIGHT — scrollable service cards ── */}
        <div className="lg:col-span-7 border-l border-border">
          {services.map((service, i) => {
            const Icon = ICON_MAP[service.icon] ?? CreditCard;
            const isActive = i === activeIndex;

            return (
              <button
                key={service.id}
                onClick={() => setActiveIndex(i)}
                className={`w-full text-left group border-b border-border flex flex-col sm:flex-row items-start gap-6 px-8 py-10 transition-colors duration-300 ${
                  isActive
                    ? "bg-foreground text-background"
                    : "bg-background hover:bg-muted/40"
                }`}
              >
                {/* Number + icon */}
                <div className="flex items-center gap-4 shrink-0">
                  <span
                    className={`text-4xl font-black tabular-nums leading-none ${
                      isActive ? "text-background/10" : "text-foreground/10"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <div
                    className={`w-10 h-10 border-2 flex items-center justify-center transition-colors ${
                      isActive
                        ? "border-background/40 text-background"
                        : "border-foreground/20 text-foreground group-hover:border-foreground"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Text */}
                <div className="flex-1">
                  <h3
                    className={`text-xl font-bold tracking-tight mb-2 ${
                      isActive ? "text-background" : ""
                    }`}
                  >
                    {service.title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed line-clamp-2 ${
                      isActive ? "text-background/70" : "text-muted-foreground"
                    }`}
                  >
                    {service.description}
                  </p>
                </div>

                {/* Arrow */}
                <ArrowRight
                  className={`w-5 h-5 shrink-0 mt-1 transition-transform group-hover:translate-x-1 ${
                    isActive ? "text-primary" : "text-foreground/20"
                  }`}
                />
              </button>
            );
          })}

          {/* Bottom CTA row */}
          <div className="px-8 py-8 flex items-center justify-between border-t border-border bg-muted/20">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {services.length} services available
            </span>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 bg-foreground text-background px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-foreground/90 transition-colors"
            >
              All Services <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.4s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>
    </section>
  );
};

export default ServicesSection;
