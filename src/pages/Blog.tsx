import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Calendar, ArrowRight, ArrowUpRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import useEmblaCarousel from "embla-carousel-react";
import { apiUrl } from "@/constants/constants";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  imageUrl: string | null;
  category: { name: string; slug: string };
  createdAt: string;
};

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [emblaRef] = useEmblaCarousel({
    align: "start",
    dragFree: true,
  });

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

  const handleCardClick = useCallback((slug: string) => {
    if (isDragging.current) return;
    navigate(`/blog/${slug}`);
  }, [navigate]);

  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(posts.map((p) => p.category.name))).sort()];
  }, [posts]);

  const fetchBlogs = async (initial = false) => {
    setLoading(true);
    const url = new URL(`${apiUrl}/blogs`);
    url.searchParams.set("limit", "12");
    if (!initial && cursor) url.searchParams.set("cursor", cursor);
    const res = await fetch(url.toString());
    const data = await res.json();
    setPosts((prev) => (initial ? data.items : [...prev, ...data.items]));
    setCursor(data.nextCursor);
    setHasMore(Boolean(data.nextCursor));
    setLoading(false);
  };

  useEffect(() => { fetchBlogs(true); }, []);

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") return posts;
    return posts.filter((p) => p.category.name === activeCategory);
  }, [posts, activeCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16 md:pt-20">

        {/* ── PAGE HERO ── */}
        <section className="bg-foreground text-background py-24 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <span className="text-[20vw] font-black uppercase tracking-tighter leading-none text-background/[0.03] whitespace-nowrap">
              JOURNAL
            </span>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <span className="inline-block bg-primary text-primary-foreground px-4 py-2 text-xs font-bold uppercase tracking-wider mb-6 border-2 border-background">
              [ Blog / The Journal ]
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-bold uppercase tracking-tighter leading-[0.9] mb-6">
              Insights & <br />
              <span className="font-serif italic lowercase font-normal text-primary">updates</span>
            </h1>
            <p className="text-background/70 text-xl max-w-xl font-medium">
              Thoughts on design, printing technology, and building memorable brands.
            </p>
          </div>
        </section>

        {/* ── STICKY LEFT + SCROLL RIGHT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border-t border-border relative">

          {/* Sticky Left — Filters */}
          <div className="hidden lg:block lg:col-span-3 xl:col-span-4 relative border-r border-border bg-foreground text-background">
            <div className="sticky top-[5rem] h-[calc(100vh-5rem)] flex flex-col justify-between p-8 xl:p-12 overflow-hidden">
              
              {/* Ghost word */}
              <div className="absolute inset-0 flex items-center pointer-events-none select-none overflow-hidden">
                <span className="text-[12vw] font-black uppercase tracking-tighter leading-none text-background/[0.02] whitespace-nowrap -rotate-90 translate-x-1/4">
                  TOPICS
                </span>
              </div>

              <div className="relative z-10 flex flex-col h-full">
                <div>
                  <h2 className="text-2xl font-bold uppercase tracking-tighter mb-10 text-background/90">Categories</h2>
                  <div className="flex flex-col gap-6">
                    {categories.map((c) => (
                      <button
                        key={c}
                        onClick={() => { setActiveCategory(c); }}
                        className={`text-left font-mono text-sm font-bold uppercase tracking-widest transition-all group flex items-center gap-3 ${
                          activeCategory === c
                            ? "text-primary translate-x-2"
                            : "text-background/50 hover:text-background hover:translate-x-1"
                        }`}
                      >
                        {activeCategory === c && <ArrowRight className="w-4 h-4" />}
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-12 border-t border-background/20">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-background/40">
                    Displaying <span className="text-background">{String(filteredPosts.length).padStart(2, '0')}</span> articles
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable Right — Grid/Carousel */}
          <div className="lg:col-span-9 xl:col-span-8 bg-background">
            
            {/* Mobile Filter Bar (Hidden on desktop) */}
            <div className="lg:hidden sticky top-16 z-30 bg-background/95 backdrop-blur-md border-b border-border">
              <div className="container mx-auto px-4 flex gap-6 overflow-x-auto py-4 scrollbar-hide">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => { setActiveCategory(c); }}
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

            {loading && posts.length === 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border p-0">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="aspect-[16/9] bg-muted animate-pulse" />
                ))}
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
                <p className="text-foreground font-mono text-sm font-bold uppercase tracking-widest mb-2">No articles found</p>
                <p className="text-muted-foreground text-sm">Try selecting a different category.</p>
              </div>
            ) : filteredPosts.length > 2 ? (
              <div 
                className="overflow-hidden bg-border cursor-grab active:cursor-grabbing border-b border-border h-full" 
                ref={emblaRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
              >
                <div className="flex h-full gap-px">
                  {filteredPosts.map((post, i) => (
                    <div
                      key={post.id}
                      className="flex-[0_0_100%] sm:flex-[0_0_50%] min-w-0 group relative overflow-hidden transition-colors bg-background flex flex-col"
                      onClick={() => handleCardClick(post.slug)}
                    >
                      {/* Image Area */}
                      <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden">
                        {post.imageUrl ? (
                          <img
                            src={post.imageUrl}
                            alt={post.title}
                            loading={i < 4 ? "eager" : "lazy"}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                          />
                        ) : (
                          <div className="w-full h-full bg-muted flex items-center justify-center text-foreground/20 font-black text-3xl uppercase tracking-tighter">
                            Octopus
                          </div>
                        )}
                        <div className="absolute inset-0 bg-foreground/10 group-hover:bg-foreground/5 transition-colors duration-500 pointer-events-none" />
                        
                        {/* Hover Overlay Arrow */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-foreground/20 backdrop-blur-[2px] pointer-events-none">
                          <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center text-foreground scale-75 group-hover:scale-100 transition-transform duration-500 ease-out">
                            <ArrowUpRight className="w-6 h-6" />
                          </div>
                        </div>
                      </div>

                      {/* Info block */}
                      <div className="px-6 py-6 border-t border-border group-hover:bg-foreground group-hover:text-background transition-colors duration-300 flex-1 flex flex-col pointer-events-none">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-primary group-hover:text-primary transition-colors">
                            {post.category.name}
                          </span>
                          <span className="text-[9px] font-mono uppercase text-muted-foreground group-hover:text-background/50 flex items-center gap-1 transition-colors">
                            <Calendar className="w-2.5 h-2.5" />
                            {new Date(post.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold tracking-tight line-clamp-2 mb-3">{post.title}</h3>
                        <p className="text-sm text-muted-foreground group-hover:text-background/70 line-clamp-3 leading-relaxed transition-colors mt-auto">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border border-b border-border">
                {filteredPosts.map((post, i) => (
                  <div
                    key={post.id}
                    className="group relative overflow-hidden cursor-pointer transition-colors bg-background flex flex-col"
                    onClick={() => handleCardClick(post.slug)}
                  >
                    {/* Image Area */}
                    <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden">
                      {post.imageUrl ? (
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          loading={i < 4 ? "eager" : "lazy"}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center text-foreground/20 font-black text-3xl uppercase tracking-tighter">
                          Octopus
                        </div>
                      )}
                      <div className="absolute inset-0 bg-foreground/10 group-hover:bg-foreground/5 transition-colors duration-500" />
                      
                      {/* Hover Overlay Arrow */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-foreground/20 backdrop-blur-[2px]">
                        <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center text-foreground scale-75 group-hover:scale-100 transition-transform duration-500 ease-out">
                          <ArrowUpRight className="w-6 h-6" />
                        </div>
                      </div>
                    </div>

                    {/* Info block */}
                    <div className="px-6 py-6 border-t border-border group-hover:bg-foreground group-hover:text-background transition-colors duration-300 flex-1 flex flex-col">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-primary group-hover:text-primary transition-colors">
                          {post.category.name}
                        </span>
                        <span className="text-[9px] font-mono uppercase text-muted-foreground group-hover:text-background/50 flex items-center gap-1 transition-colors">
                          <Calendar className="w-2.5 h-2.5" />
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold tracking-tight line-clamp-2 mb-3">{post.title}</h3>
                      <p className="text-sm text-muted-foreground group-hover:text-background/70 line-clamp-3 leading-relaxed transition-colors mt-auto">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Load More */}
            {hasMore && !loading && (
              <div className="px-6 py-12 border-t border-border flex justify-center bg-background">
                <button
                  onClick={() => fetchBlogs()}
                  className="inline-flex items-center gap-3 bg-foreground text-background border border-foreground px-8 py-4 text-xs font-mono font-bold uppercase tracking-widest hover:bg-background hover:text-foreground transition-colors group"
                >
                  Load Older Entries
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </div>

        </div>

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
};

export default Blog;
