import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import banners from "@/assets/banners.jpg";
import brochures from "@/assets/brochures.jpg";
import visitingCards from "@/assets/visiting-cards.jpg";
import stickers from "@/assets/stickers-packaging.jpg";
import uvAcrylic from "@/assets/uv-acrylic.jpg";

const slides = [
  {
    image: heroBg,
    category: "01 / Brand Identity",
    headline: "Printing &",
    accent: "branding",
    subline: "Solutions",
    tagline: "Full-service creative printing for brands that mean business.",
    stat: { value: "500+", label: "Projects Delivered" },
  },
  {
    image: visitingCards,
    category: "02 / Business Cards",
    headline: "First",
    accent: "impressions",
    subline: "That Last",
    tagline: "Premium visiting cards that open doors and start conversations.",
    stat: { value: "10+", label: "Finish Options" },
  },
  {
    image: brochures,
    category: "03 / Brochures",
    headline: "Stories",
    accent: "told",
    subline: "Beautifully",
    tagline: "Tri-folds, booklets and mailers crafted to convert.",
    stat: { value: "A4–A0", label: "Size Range" },
  },
  {
    image: banners,
    category: "04 / Banners & Signage",
    headline: "Stand",
    accent: "out",
    subline: "Everywhere",
    tagline: "Large-format prints for events, retail and outdoor impact.",
    stat: { value: "48h", label: "Rush Turnaround" },
  },
  {
    image: stickers,
    category: "05 / Stickers & Packaging",
    headline: "Packaging",
    accent: "that",
    subline: "Sells",
    tagline: "Custom stickers, labels and boxes that elevate your product.",
    stat: { value: "100%", label: "Custom Shapes" },
  },
  {
    image: uvAcrylic,
    category: "06 / UV & Acrylic",
    headline: "Premium",
    accent: "finishes",
    subline: "& Textures",
    tagline: "UV spot, embossing, foil and acrylic — the luxury tier.",
    stat: { value: "15+", label: "Specialty Finishes" },
  },
];

/* ─── Shared Left Panel Content ─────────────────────────────────────────── */
const SlideContent = ({
  slide,
  index,
  total,
  onPrev,
  onNext,
  onDotClick,
  mobile = false,
}: {
  slide: (typeof slides)[0];
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onDotClick: (i: number) => void;
  mobile?: boolean;
}) => (
  <div className={mobile ? "relative z-10 p-8 flex flex-col justify-end h-full" : "relative z-10"}>
    {/* Badge */}
    <div className="overflow-hidden mb-5">
      <span
        key={`badge-${index}`}
        className="inline-block bg-primary text-primary-foreground px-4 py-2 text-xs font-bold uppercase tracking-wider border-2 border-background animate-slide-up"
      >
        [ {slide.category} ]
      </span>
    </div>

    {/* Headline */}
    <div className="overflow-hidden mb-6">
      <h1
        key={`h-${index}`}
        className={`font-bold text-background leading-[0.9] tracking-tighter uppercase animate-slide-up ${mobile
          ? "text-4xl sm:text-5xl"
          : "text-5xl md:text-7xl lg:text-[5.2rem]"
          }`}
      >
        {slide.headline} <br />
        <span className="font-serif italic lowercase text-primary font-normal">
          {slide.accent}
        </span>{" "}
        <br />
        {slide.subline}
      </h1>
    </div>

    {/* Tagline */}
    <p
      key={`tag-${index}`}
      className="text-base text-background/75 leading-relaxed font-medium max-w-xs mb-6 animate-slide-up animation-delay-80"
    >
      {slide.tagline}
    </p>

    {/* Stat */}
    <div
      key={`stat-${index}`}
      className="flex items-end gap-3 mb-8 animate-slide-up animation-delay-120"
    >
      <span className="text-4xl font-light tracking-tighter text-primary leading-none">
        {slide.stat.value}
      </span>
      <span className="text-[10px] uppercase tracking-widest font-medium text-background/50 mb-1">
        {slide.stat.label}
      </span>
    </div>

    {/* CTAs */}
    {!mobile && (
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Button
          variant="default"
          size="xl"
          className="text-lg group transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90"
          asChild
        >
          <Link to="/contact">
            <span className="flex items-center">
              Start Project
              <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        </Button>
        <Button
          variant="outline"
          size="xl"
          className="text-lg border-2 border-background/40 text-foreground hover:bg-background hover:text-foreground transition-all"
          asChild
        >
          <Link to="/portfolio">View Work</Link>
        </Button>
      </div>
    )}

    {/* Mobile CTAs */}
    {mobile && (
      <div className="flex gap-3 mb-6">
        <Link
          to="/contact"
          className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-3 text-sm font-bold uppercase tracking-wider"
        >
          Start Project <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          to="/portfolio"
          className="flex-1 flex items-center justify-center gap-2 border-2 border-background/50 text-background px-5 py-3 text-sm font-bold uppercase tracking-wider"
        >
          View Work
        </Link>
      </div>
    )}

    {/* Dots + Arrows row */}
    <div className="flex items-center gap-4">
      <button
        onClick={onPrev}
        className="w-8 h-8 border border-background/30 hover:border-background flex items-center justify-center transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <div className="flex gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => onDotClick(i)}
            className={`transition-all duration-300 rounded-full ${i === index
              ? "w-6 h-2 bg-primary"
              : "w-2 h-2 bg-background/30 hover:bg-background/60"
              }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      <button
        onClick={onNext}
        className="w-8 h-8 border border-background/30 hover:border-background flex items-center justify-center transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-background/40">
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
    </div>
  </div>
);

/* ─── Main Component ──────────────────────────────────────────────────────── */
const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const goTo = useCallback(
    (i: number) => {
      const next = (i + slides.length) % slides.length;
      setActiveIndex(next);
      // Desktop: scroll right panel slide into view
      slideRefs.current[next]?.scrollIntoView({ behavior: "smooth", block: "center" });
    },
    []
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  // Desktop: IntersectionObserver on right-panel slides
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    slideRefs.current.forEach((el, i) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setActiveIndex(i);
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const current = slides[activeIndex];

  return (
    <section className="relative bg-foreground text-background pt-16">

      {/* ══════════════ MOBILE (< lg) — Full-screen stacked slides ══════════════ */}
      <div className="lg:hidden">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`relative min-h-screen flex flex-col justify-end transition-opacity duration-500 ${i === activeIndex ? "block" : "hidden"
              }`}
          >
            {/* Background image */}
            <img
              src={slide.image}
              alt={slide.category}
              className="absolute inset-0 w-full h-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />
            {/* Gradient overlay — strong at bottom for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/70 to-foreground/30" />

            <SlideContent
              slide={slide}
              index={activeIndex}
              total={slides.length}
              onPrev={goPrev}
              onNext={goNext}
              onDotClick={goTo}
              mobile
            />
          </div>
        ))}
      </div>

      {/* ══════════════ DESKTOP (lg+) — Sticky left + scroll right ══════════════ */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-12">

          {/* Sticky left */}
          <div className="col-span-5 relative">
            <div className="sticky top-16 h-[calc(100vh-4rem)] flex flex-col justify-center pl-8 xl:pl-16 pr-8 py-24 overflow-hidden">
              {/* Ghost word background */}
              <div className="absolute inset-0 flex items-center pointer-events-none select-none overflow-hidden">
                <span className="text-[15vw] font-black uppercase tracking-tighter leading-none text-background/[0.025] whitespace-nowrap -ml-4">
                  CREATIVE
                </span>
              </div>

              <SlideContent
                slide={current}
                index={activeIndex}
                total={slides.length}
                onPrev={goPrev}
                onNext={goNext}
                onDotClick={goTo}
              />
            </div>
          </div>

          {/* Scrollable right */}
          <div className="col-span-7">
            {slides.map((slide, i) => (
              <div
                key={i}
                ref={(el) => { slideRefs.current[i] = el; }}
                className="relative h-screen flex flex-col overflow-hidden"
              >
                {/* Image — 68% height */}
                <div className="relative flex-[0_0_68%] overflow-hidden group">
                  <img
                    src={slide.image}
                    alt={slide.category}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-foreground/25" />

                  {/* Category label top-left */}
                  <div className="absolute top-8 left-8">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-background/60 bg-foreground/40 px-3 py-1 backdrop-blur-sm">
                      {slide.category}
                    </span>
                  </div>

                  {/* Ghost slide number — bottom right */}
                  <div className="absolute bottom-4 right-6 text-background/10 font-black text-[6rem] leading-none select-none pointer-events-none">
                    0{i + 1}
                  </div>

                  {/* Scroll hint — first slide only */}
                  {i === 0 && (
                    <div className="absolute bottom-6 left-8 flex items-center gap-2 text-background/40 text-[10px] uppercase tracking-widest font-mono animate-bounce">
                      <ArrowDown className="w-3 h-3" />
                      Scroll to explore
                    </div>
                  )}
                </div>

                {/* Bottom breathing area — 32% */}
                <div className="flex-1 bg-foreground border-t border-background/10 flex flex-col justify-between px-10 py-7">
                  <div className="flex items-start justify-between gap-6">
                    {/* Left: tagline */}
                    <div className="flex-1">
                      <p className="text-background/50 font-mono text-[10px] uppercase tracking-widest mb-2">
                        {slide.category}
                      </p>
                      <p className="text-background/85 text-base leading-snug font-medium max-w-[260px]">
                        {slide.tagline}
                      </p>
                    </div>

                    {/* Right: stat */}
                    <div className="text-right shrink-0">
                      <span className="block text-3xl font-light tracking-tighter text-primary leading-none mb-1">
                        {slide.stat.value}
                      </span>
                      <span className="text-[10px] uppercase tracking-widest font-mono text-background/40">
                        {slide.stat.label}
                      </span>
                    </div>
                  </div>

                  {/* Quick action row */}
                  <div className="flex items-center justify-between border-t border-background/10 pt-5">
                    <Link
                      to="/services"
                      className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-background/50 hover:text-primary transition-colors group"
                    >
                      Explore Service
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2 text-xs font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors"
                    >
                      Get Quote <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.45s cubic-bezier(0.22,1,0.36,1) both; }
        .animation-delay-80  { animation-delay: 0.08s; }
        .animation-delay-120 { animation-delay: 0.13s; }
      `}</style>
    </section>
  );
};

export default HeroSection;
