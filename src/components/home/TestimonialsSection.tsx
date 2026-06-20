import { useEffect, useRef, useState } from "react";
import { Star, Quote, UserCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { apiUrl } from "@/constants/constants";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
};

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    fetch(`${apiUrl}/testimonials/featured`)
      .then((r) => r.json())
      .then((data) => setTestimonials(data))
      .catch((e) => console.error("Error fetching testimonials", e))
      .finally(() => setLoading(false));
  }, []);

  // IntersectionObserver — sync active on desktop scroll
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) setActiveIndex(i);
        },
        { threshold: 0.5 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [testimonials]);

  const goTo = (i: number) => {
    const next = (i + testimonials.length) % testimonials.length;
    setActiveIndex(next);
    itemRefs.current[next]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  if (loading || testimonials.length === 0) return null;

  const active = testimonials[activeIndex];

  return (
    <section className="bg-background relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12">

        {/* ── STICKY LEFT — section header + active testimonial large view ── */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-0 h-auto lg:h-screen flex flex-col justify-center px-6 xl:px-16 py-16 lg:py-24 overflow-hidden">

            {/* Ghost word */}
            <div className="absolute inset-0 flex items-center pointer-events-none select-none overflow-hidden">
              <span className="text-[13vw] font-black uppercase tracking-tighter leading-none text-foreground/[0.03] whitespace-nowrap">
                CLIENTS
              </span>
            </div>

            <div className="relative z-10">
              {/* Label */}
              <span className="inline-block bg-secondary text-secondary-foreground px-4 py-2 text-xs font-bold uppercase tracking-wider mb-6 border-2 border-secondary">
                [ 05 / Client Voices ]
              </span>

              {/* Section headline */}
              <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tighter leading-[0.9] mb-8">
                What Our <br />
                <span className="font-serif italic lowercase font-normal text-secondary">
                  clients say
                </span>
              </h2>

              <div className="w-12 h-px bg-foreground/20 mb-8" />

              {/* Active testimonial — large quote on left */}
              {active && (
                <div key={active.id} className="animate-fade-in">
                  {/* Stars */}
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 transition-colors ${
                          i < active.rating
                            ? "fill-secondary text-secondary"
                            : "text-foreground/10"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Large quote mark */}
                  <Quote className="w-10 h-10 text-secondary/20 mb-4" />

                  {/* Quote text */}
                  <p className="font-serif text-xl italic leading-relaxed text-foreground mb-8 max-w-sm">
                    "{active.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 rounded-full border-2 border-secondary flex items-center justify-center bg-muted overflow-hidden">
                      <UserCircle className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-bold text-base leading-tight">{active.name}</p>
                      <p className="text-xs text-secondary font-mono uppercase tracking-widest mt-0.5">
                        {active.role}
                      </p>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => goTo(activeIndex - 1)}
                      className="w-9 h-9 border-2 border-foreground/20 hover:border-foreground flex items-center justify-center transition-colors"
                      aria-label="Previous"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <div className="flex gap-2">
                      {testimonials.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => goTo(i)}
                          className={`transition-all duration-300 rounded-full ${
                            i === activeIndex
                              ? "w-6 h-2 bg-secondary"
                              : "w-2 h-2 bg-foreground/20 hover:bg-foreground/40"
                          }`}
                          aria-label={`Testimonial ${i + 1}`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={() => goTo(activeIndex + 1)}
                      className="w-9 h-9 border-2 border-foreground/20 hover:border-foreground flex items-center justify-center transition-colors"
                      aria-label="Next"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {String(activeIndex + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── SCROLLABLE RIGHT — testimonial rows ── */}
        <div className="lg:col-span-7 border-l border-border">
          {testimonials.map((t, i) => {
            const isActive = i === activeIndex;
            return (
              <div
                key={t.id}
                ref={(el) => { itemRefs.current[i] = el; }}
                onClick={() => setActiveIndex(i)}
                className={`group cursor-pointer border-b border-border px-8 py-10 flex flex-col gap-5 transition-colors duration-300 ${
                  isActive ? "bg-secondary/5" : "hover:bg-muted/30"
                }`}
              >
                {/* Top row: stars + counter + role */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, si) => (
                      <Star
                        key={si}
                        className={`w-3.5 h-3.5 transition-colors ${
                          si < t.rating
                            ? "fill-secondary text-secondary"
                            : "text-foreground/10"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    0{i + 1}
                  </span>
                </div>

                {/* Quote */}
                <p
                  className={`font-serif italic leading-relaxed line-clamp-3 text-base transition-colors ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground group-hover:text-foreground"
                  }`}
                >
                  "{t.content}"
                </p>

                {/* Author row */}
                <div className="flex items-center gap-3 pt-2 border-t border-border">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center overflow-hidden transition-colors ${
                      isActive ? "bg-secondary/20" : "bg-muted"
                    }`}
                  >
                    <UserCircle
                      className={`w-7 h-7 ${
                        isActive ? "text-secondary" : "text-muted-foreground"
                      }`}
                    />
                  </div>
                  <div>
                    <p className="font-bold text-sm leading-tight">{t.name}</p>
                    <p
                      className={`text-[10px] font-mono uppercase tracking-widest mt-0.5 ${
                        isActive ? "text-secondary" : "text-muted-foreground"
                      }`}
                    >
                      {t.role}
                    </p>
                  </div>

                  {/* Active indicator */}
                  {isActive && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  )}
                </div>
              </div>
            );
          })}

          {/* Bottom tag line */}
          <div className="px-8 py-6 bg-muted/20 border-t border-border">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Trusted by {testimonials.length}+ happy clients — and counting.
            </p>
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

export default TestimonialsSection;
