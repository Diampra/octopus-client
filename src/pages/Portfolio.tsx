import { useEffect, useMemo, useRef, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import { apiUrl } from "@/constants/constants";

type PortfolioItem = {
  id: string;
  title: string;
  client: string;
  description: string;
  imageUrl: string;
  category: { name: string };
};

const Portfolio = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(items.map((i) => i.category.name))).sort()],
    [items]
  );

  const fetchItems = async (initial = false) => {
    setLoading(true);
    const url = new URL(`${apiUrl}/portfolio`);
    url.searchParams.set("limit", "12");
    if (!initial && cursor) url.searchParams.set("cursor", cursor);
    const res = await fetch(url.toString());
    const data = await res.json();
    setItems((prev) => (initial ? data.items : [...prev, ...data.items]));
    setCursor(data.nextCursor);
    setHasMore(Boolean(data.nextCursor));
    setLoading(false);
  };

  useEffect(() => { fetchItems(true); }, []);

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return items;
    return items.filter((i) => i.category.name === activeCategory);
  }, [items, activeCategory]);

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
  }, [filteredItems]);

  const active = filteredItems[activeIndex];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16 md:pt-20">

        {/* ── PAGE HERO (dark, full-bleed) ── */}
        <section className="bg-foreground text-background py-24 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <span className="text-[22vw] font-black uppercase tracking-tighter leading-none text-background/[0.03] whitespace-nowrap">
              ARCHIVE
            </span>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <span className="inline-block bg-primary text-primary-foreground px-4 py-2 text-xs font-bold uppercase tracking-wider mb-6 border-2 border-background">
              [ Portfolio / The Archive ]
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-bold uppercase tracking-tighter leading-[0.9] mb-6">
              Selected <br />
              <span className="font-serif italic lowercase font-normal text-primary">works</span>
            </h1>
            <p className="text-background/70 text-xl max-w-xl font-medium">
              A curated archive of printing and design projects delivered with precision and bold creativity.
            </p>
          </div>
        </section>

        {/* ── STICKY FILTER BAR ── */}
        <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="container mx-auto px-4 flex gap-6 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => { setActiveCategory(c); setActiveIndex(0); }}
                className={`shrink-0 pb-1.5 text-xs font-bold font-mono uppercase tracking-widest transition-colors border-b-2 ${
                  activeCategory === c
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* ── STICKY LEFT + SCROLL RIGHT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12">

          {/* Sticky Left — active project detail */}
          <div className="hidden lg:block lg:col-span-4 relative border-r border-border">
            <div className="sticky top-[calc(4rem+49px)] h-[calc(100vh-4rem-49px)] flex flex-col justify-between px-8 xl:px-12 py-10 overflow-hidden">

              {/* Ghost word */}
              <div className="absolute inset-0 flex items-center pointer-events-none select-none overflow-hidden">
                <span className="text-[10vw] font-black uppercase tracking-tighter leading-none text-foreground/[0.025] whitespace-nowrap">
                  PROJECT
                </span>
              </div>

              <div className="relative z-10 flex flex-col h-full">
                {/* Active project preview */}
                {active ? (
                  <div key={active.id} className="animate-fade-in flex flex-col h-full">
                    {/* Thumbnail */}
                    <div className="aspect-[4/3] w-full overflow-hidden mb-6 bg-muted relative group">
                      <img
                        src={active.imageUrl}
                        alt={active.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-foreground/10" />
                    </div>

                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                      {active.category.name} — {String(activeIndex + 1).padStart(2, "0")} / {String(filteredItems.length).padStart(2, "0")}
                    </p>
                    <h2 className="text-2xl font-bold tracking-tight mb-3 leading-tight">{active.title}</h2>
                    <p className="text-sm text-muted-foreground mb-2">
                      Client: <span className="font-semibold text-foreground">{active.client}</span>
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-6 flex-grow">
                      {active.description}
                    </p>

                    <button
                      onClick={() => setSelectedItem(active)}
                      className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest border-b-2 border-foreground pb-1 hover:text-primary hover:border-primary transition-colors w-fit"
                    >
                      View Full Project <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-muted-foreground font-mono text-sm uppercase tracking-widest">
                    No project selected
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Scrollable Right — grid */}
          <div className="lg:col-span-8">
            {loading && items.length === 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border p-0">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="aspect-[4/3] bg-muted animate-pulse" />
                ))}
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="flex items-center justify-center py-32">
                <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest">No projects found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border">
                {filteredItems.map((item, i) => (
                  <div
                    key={item.id}
                    ref={(el) => { itemRefs.current[i] = el; }}
                    className={`group relative overflow-hidden cursor-pointer transition-colors ${
                      i === activeIndex ? "ring-2 ring-inset ring-primary" : ""
                    }`}
                    onClick={() => { setActiveIndex(i); setSelectedItem(item); }}
                  >
                    {/* Image — 72% */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        loading={i < 4 ? "eager" : "lazy"}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/10 transition-colors duration-400" />
                      {/* Category pill */}
                      <div className="absolute top-4 left-4">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-background/80 bg-foreground/50 px-2.5 py-1 backdrop-blur-sm">
                          {item.category.name}
                        </span>
                      </div>
                      {/* Arrow icon on hover */}
                      <div className="absolute bottom-4 right-4 w-9 h-9 border border-background/30 flex items-center justify-center bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                        <ArrowUpRight className="w-4 h-4 text-background" />
                      </div>
                    </div>

                    {/* Info strip */}
                    <div className={`px-5 py-4 flex items-center justify-between transition-colors ${
                      i === activeIndex ? "bg-foreground text-background" : "bg-background"
                    }`}>
                      <div>
                        <p className={`font-mono text-[9px] uppercase tracking-widest mb-0.5 ${i === activeIndex ? "text-background/50" : "text-muted-foreground"}`}>
                          {item.category.name}
                        </p>
                        <h3 className="text-sm font-bold tracking-tight line-clamp-1">{item.title}</h3>
                      </div>
                      <span className={`font-mono text-[10px] ${i === activeIndex ? "text-primary" : "text-foreground/20"}`}>
                        0{i + 1}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {hasMore && !loading && (
              <div className="px-8 py-10 border-t border-border flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Showing {filteredItems.length} projects
                </span>
                <button
                  onClick={() => fetchItems()}
                  className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 text-xs font-bold uppercase tracking-wider hover:bg-foreground/90 transition-colors"
                >
                  Load More <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

        </div>

        {/* ── BOTTOM CTA ── */}
        <section className="py-24 bg-foreground text-background relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <span className="text-[18vw] font-black uppercase tracking-tighter leading-none text-background/[0.03] whitespace-nowrap">
              INSPIRED
            </span>
          </div>
          <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-none mb-4">
                Ready to <span className="text-primary italic font-serif lowercase">create?</span>
              </h2>
              <p className="text-background/70 text-lg max-w-md font-medium">
                Let's build something powerful for your brand. Reach out today.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors shrink-0 group"
            >
              Start Your Project
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>

      </main>

      <Footer />

      {/* ── PROJECT MODAL ── */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 bg-foreground/95 backdrop-blur-sm">
          <div className="bg-background w-full h-full max-w-7xl flex flex-col md:flex-row relative overflow-hidden shadow-2xl">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-5 right-5 z-10 w-10 h-10 border-2 border-foreground/20 flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image */}
            <div className="w-full md:w-2/3 h-[40vh] md:h-full bg-muted overflow-hidden">
              <img src={selectedItem.imageUrl} alt={selectedItem.title} className="w-full h-full object-cover" />
            </div>

            {/* Details */}
            <div className="w-full md:w-1/3 flex flex-col justify-center p-8 md:p-12 overflow-y-auto">
              <span className="inline-block font-mono text-[10px] uppercase tracking-widest text-primary mb-4">
                {selectedItem.category.name}
              </span>
              <h3 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight mb-6">{selectedItem.title}</h3>
              <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">Client</p>
              <p className="text-xl font-bold uppercase mb-6">{selectedItem.client}</p>
              <p className="text-muted-foreground leading-relaxed mb-10">{selectedItem.description}</p>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors group"
              >
                Request Similar Project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.35s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>
    </div>
  );
};

export default Portfolio;
