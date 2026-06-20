import { useEffect, useMemo, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, X, ArrowUpRight } from "lucide-react";
import { apiUrl } from "@/constants/constants";

type Category = {
  name: string;
};

type PortfolioItem = {
  id: string;
  title: string;
  client: string;
  description: string;
  imageUrl: string;
  category: Category;
};

const PortfolioSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="border-4 border-foreground bg-card aspect-[4/5]" />
      ))}
    </div>
  );
};

const Portfolio = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(items.map((i) => i.category.name))).sort()],
    [items]
  );

  /* Fetch portfolio items */
  const fetchItems = async (initial = false) => {
    setLoading(true);

    const url = new URL(`${apiUrl}/portfolio`);
    url.searchParams.set("limit", "9");
    if (!initial && cursor) url.searchParams.set("cursor", cursor);

    const res = await fetch(url.toString());
    const data = await res.json();

    setItems((prev) => (initial ? data.items : [...prev, ...data.items]));
    setCursor(data.nextCursor);
    setHasMore(Boolean(data.nextCursor));

    setLoading(false);
  };

  useEffect(() => {
    fetchItems(true);
  }, []);

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return items;
    return items.filter((i) => i.category.name === activeCategory);
  }, [items, activeCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16 md:pt-20">
        {/* HERO */}
        <section className="bg-background border-b-2 border-foreground py-24 md:py-32 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full text-center pointer-events-none select-none opacity-[0.03]">
            <span className="text-[25vw] font-black uppercase tracking-tighter leading-none text-foreground">
              ARCHIVE
            </span>
          </div>

          <div className="container mx-auto px-4 text-center">
            <span className="inline-block bg-primary text-primary-foreground px-4 py-2 text-sm font-bold uppercase border-2 border-foreground mb-8">
              Selected Works
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-bold uppercase tracking-tighter leading-none mb-6">
              The <span className="text-primary italic font-serif lowercase">Archive</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto font-medium">
              A curated selection of printing and design projects delivered with precision and bold creativity.
            </p>
          </div>
        </section>

        {/* FILTER */}
        <section className="py-8 border-b-2 border-foreground sticky top-16 z-30 bg-background/95 backdrop-blur-sm">
          <div className="container mx-auto px-4 flex flex-wrap gap-3 justify-center">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-6 py-2 font-mono text-sm font-bold uppercase tracking-wider border-2 border-foreground transition-all ${
                  activeCategory === c
                    ? "bg-foreground text-background shadow-md"
                    : "bg-background hover:bg-accent text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </section>

        {/* ASYMMETRICAL GRID */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            {loading && items.length === 0 ? (
              <PortfolioSkeleton />
            ) : filteredItems.length === 0 ? (
              <p className="text-center text-muted-foreground font-mono text-lg uppercase">
                No projects found.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[400px]">
                {filteredItems.map((item, index) => {
                  // Asymmetrical layout logic: some items span multiple rows/cols
                  const isFeatured = index % 5 === 0; // Every 5th item is large
                  const isTall = index % 7 === 2; // Some items are tall

                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className={`group relative text-left border-4 border-foreground overflow-hidden hover:shadow-lg transition-all flex flex-col bg-muted ${
                        isFeatured
                          ? "md:col-span-2 md:row-span-2"
                          : isTall
                          ? "md:row-span-2"
                          : "col-span-1 row-span-1"
                      }`}
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-foreground/10 group-hover:bg-foreground/80 transition-colors duration-500 flex flex-col justify-end p-8">
                        <div className="translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                          <span className="inline-block bg-secondary text-secondary-foreground px-3 py-1 text-xs font-mono font-bold uppercase tracking-widest border-2 border-foreground mb-4">
                            {item.category.name}
                          </span>
                          <h3 className="font-bold text-3xl md:text-4xl text-background mb-2 tracking-tighter">
                            {item.title}
                          </h3>
                          <p className="text-background/80 font-mono uppercase text-sm tracking-wider flex items-center gap-2">
                            Client: {item.client}
                            <ArrowUpRight className="w-4 h-4 ml-2" />
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {hasMore && !loading && (
              <div className="flex justify-center mt-24 pt-16 border-t-2 border-foreground">
                <button
                  onClick={() => fetchItems()}
                  disabled={loading}
                  className="px-12 py-4 border-4 border-foreground font-bold uppercase tracking-widest text-lg hover:bg-foreground hover:text-background transition-colors disabled:opacity-50"
                >
                  {loading ? "Loading..." : "Load More Projects"}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-foreground text-background text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full text-center pointer-events-none select-none opacity-[0.03]">
            <span className="text-[20vw] font-black uppercase tracking-tighter leading-none text-background">
              INSPIRED
            </span>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-none mb-6">
              Ready to <span className="text-secondary italic font-serif lowercase">Create?</span>
            </h2>
            <p className="text-xl text-background/80 mb-12 max-w-2xl mx-auto font-medium">
              Let's build something powerful for your brand. Reach out today.
            </p>
            <Button
              variant="default"
              size="xl"
              className="bg-secondary text-secondary-foreground hover:bg-background hover:text-foreground border-2 border-secondary hover:border-foreground transition-colors text-xl btn-arrow-hover px-12"
              asChild
            >
              <Link to="/contact">
                Start Your Project <ArrowRight className="w-6 h-6 ml-2 arrow-icon" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />

      {/* FULL SCREEN MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 bg-foreground/95 backdrop-blur-sm">
          <div className="bg-background border-4 border-foreground w-full h-full max-w-7xl flex flex-col md:flex-row relative animate-in fade-in zoom-in-95 duration-300 shadow-2xl">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 md:top-8 md:right-8 z-10 w-12 h-12 bg-background text-foreground border-4 border-foreground flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-all group"
            >
              <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
            </button>

            {/* Image Side */}
            <div className="w-full md:w-2/3 h-[40vh] md:h-full bg-muted border-b-4 md:border-b-0 md:border-r-4 border-foreground overflow-hidden">
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Side */}
            <div className="w-full md:w-1/3 h-[60vh] md:h-full p-8 md:p-12 overflow-y-auto flex flex-col justify-center">
              <div>
                <span className="inline-block bg-secondary text-secondary-foreground px-4 py-2 font-mono text-sm font-bold uppercase tracking-widest border-2 border-foreground mb-6">
                  {selectedItem.category.name}
                </span>
                
                <h3 className="text-5xl md:text-6xl font-bold mb-6 tracking-tighter leading-none uppercase">
                  {selectedItem.title}
                </h3>
                
                <div className="mb-8 p-6 bg-accent border-2 border-foreground">
                  <span className="block text-sm font-mono uppercase tracking-widest text-muted-foreground mb-1">
                    Client
                  </span>
                  <span className="text-xl font-bold uppercase">
                    {selectedItem.client}
                  </span>
                </div>
                
                <p className="text-muted-foreground text-lg leading-relaxed mb-12 font-medium">
                  {selectedItem.description}
                </p>
                
                <Button variant="default" size="xl" className="w-full border-2 border-foreground shadow-sm hover:shadow-md transition-all text-lg btn-arrow-hover" asChild>
                  <Link to="/contact">
                    Request Similar Project <ArrowRight className="w-5 h-5 ml-2 arrow-icon" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
