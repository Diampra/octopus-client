import { useCallback, useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { apiUrl } from "@/constants/constants";
import useEmblaCarousel from "embla-carousel-react";

type PortfolioItem = {
  id: string;
  title: string;
  imageUrl: string;
  client?: string;
  category: { name: string };
};

const PortfolioPreview = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    slidesToScroll: 1,
  });

  useEffect(() => {
    fetch(`${apiUrl}/portfolio/featured`)
      .then((res) => res.json())
      .then((data) => setItems(data.slice(0, 8)))
      .finally(() => setLoading(false));
  }, []);

  // Sync activeIndex with embla scroll position
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setActiveIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const goTo = useCallback((i: number) => {
    emblaApi?.scrollTo(i);
    setActiveIndex(i);
  }, [emblaApi]);

  // Track pointer movement to distinguish drag from click
  const pointerDownX = useRef<number>(0);
  const isDragging = useRef<boolean>(false);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerDownX.current = e.clientX;
    isDragging.current = false;
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (Math.abs(e.clientX - pointerDownX.current) > 5) {
      isDragging.current = true;
    }
  }, []);

  const handleCardClick = useCallback((i: number) => {
    if (isDragging.current) return;
    goTo(i);
  }, [goTo]);

  if (loading || !items.length) return null;

  const active = items[activeIndex];

  return (
    <section className="bg-background relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12">

        {/* ── STICKY RIGHT — section header + active detail ── */}
        <div className="lg:col-span-5 order-1 lg:order-2 border-l border-border">
          <div className="sticky top-0 h-auto lg:h-screen flex flex-col justify-center px-6 xl:px-14 py-16 lg:py-24 overflow-hidden">

            {/* Ghost word */}
            <div className="absolute inset-0 flex items-center pointer-events-none select-none overflow-hidden">
              <span className="text-[13vw] font-black uppercase tracking-tighter leading-none text-foreground/[0.03] whitespace-nowrap">
                WORKS
              </span>
            </div>

            <div className="relative z-10">
              {/* Label */}
              <span className="inline-block bg-primary text-primary-foreground px-4 py-2 text-xs font-bold uppercase tracking-wider mb-6 border-2 border-primary">
                [ 03 / Showcase ]
              </span>

              {/* Section headline */}
              <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tighter leading-[0.9] mb-6">
                Selected <br />
                <span className="font-serif italic lowercase font-normal text-primary">
                  works
                </span>
              </h2>

              <div className="w-12 h-px bg-foreground/20 mb-8" />

              {/* Active item detail */}
              {active && (
                <div key={active.id} className="animate-fade-in">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                    {String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")} — {active.category.name}
                  </p>

                  <h3 className="text-2xl font-bold tracking-tight mb-3 leading-tight">
                    {active.title}
                  </h3>

                  {active.client && (
                    <p className="text-muted-foreground text-sm mb-6">
                      Client: <span className="font-medium text-foreground">{active.client}</span>
                    </p>
                  )}

                  {/* Carousel controls + dots */}
                  <div className="flex items-center gap-3 mb-8">
                    <button
                      onClick={scrollPrev}
                      className="w-9 h-9 border-2 border-foreground/20 hover:border-foreground flex items-center justify-center transition-colors"
                      aria-label="Previous"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <div className="flex gap-1.5 flex-wrap">
                      {items.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => goTo(i)}
                          className={`transition-all duration-300 rounded-full ${
                            i === activeIndex
                              ? "w-6 h-2 bg-primary"
                              : "w-2 h-2 bg-foreground/20 hover:bg-foreground/50"
                          }`}
                          aria-label={`Go to project ${i + 1}`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={scrollNext}
                      className="w-9 h-9 border-2 border-foreground/20 hover:border-foreground flex items-center justify-center transition-colors"
                      aria-label="Next"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <Link
                    to="/portfolio"
                    className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest border-b-2 border-foreground pb-1 hover:text-primary hover:border-primary transition-colors group"
                  >
                    View Full Portfolio
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── CAROUSEL LEFT — draggable cards ── */}
        <div className="lg:col-span-7 order-2 lg:order-1 flex flex-col justify-center py-12 lg:py-0 lg:h-screen overflow-hidden">

          {/* Embla viewport */}
          <div
            className="overflow-hidden px-4 lg:px-8"
            ref={emblaRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
          >
            <div className="flex gap-4">
              {items.map((item, i) => (
                <div
                  key={item.id}
                  className="flex-[0_0_75%] sm:flex-[0_0_55%] lg:flex-[0_0_42%] min-w-0 group cursor-pointer"
                  onClick={() => handleCardClick(i)}
                >
                  {/* Card */}
                  <div className={`flex flex-col overflow-hidden transition-all duration-500 ${
                    i === activeIndex
                      ? "ring-2 ring-primary shadow-xl"
                      : "opacity-60 hover:opacity-90 hover:shadow-md"
                  }`}>
                    {/* Image */}
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        loading={i < 2 ? "eager" : "lazy"}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                      <div className={`absolute inset-0 transition-colors duration-500 ${
                        i === activeIndex ? "bg-primary/10" : "bg-foreground/20 group-hover:bg-foreground/10"
                      }`} />

                      {/* Category pill */}
                      <div className="absolute top-3 left-3">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-background/85 bg-foreground/50 px-2 py-0.5 backdrop-blur-sm">
                          {item.category.name}
                        </span>
                      </div>

                      {/* Ghost number */}
                      <div className="absolute bottom-3 right-4 text-background/[0.07] font-black text-[4rem] leading-none select-none pointer-events-none">
                        {String(i + 1).padStart(2, "0")}
                      </div>

                      {/* Active badge */}
                      {i === activeIndex && (
                        <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-primary animate-pulse" />
                      )}
                    </div>

                    {/* Info strip */}
                    <div className={`flex items-center justify-between px-4 py-3 border-t border-border transition-colors duration-300 ${
                      i === activeIndex ? "bg-foreground text-background" : "bg-background"
                    }`}>
                      <div className="min-w-0">
                        <p className={`font-mono text-[9px] uppercase tracking-widest mb-0.5 ${
                          i === activeIndex ? "text-background/50" : "text-muted-foreground"
                        }`}>
                          {item.category.name}
                        </p>
                        <h3 className="text-sm font-bold tracking-tight line-clamp-1">{item.title}</h3>
                      </div>
                      <Link
                        to="/portfolio"
                        onClick={(e) => e.stopPropagation()}
                        className={`w-8 h-8 border flex items-center justify-center transition-colors shrink-0 ml-3 ${
                          i === activeIndex
                            ? "border-background/30 text-background hover:bg-background hover:text-foreground"
                            : "border-border hover:border-foreground"
                        }`}
                        aria-label="View project"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Drag hint */}
          <p className="text-center font-mono text-[9px] uppercase tracking-widest text-muted-foreground mt-6 px-4 lg:px-8">
            ← drag to explore →
          </p>
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

export default PortfolioPreview;
