import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight, ArrowUpRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

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
  }, [filteredPosts]);

  const active = filteredPosts[activeIndex];

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
            <span className="inline-block bg-secondary text-secondary-foreground px-4 py-2 text-xs font-bold uppercase tracking-wider mb-6 border-2 border-background">
              [ Blog / The Journal ]
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-bold uppercase tracking-tighter leading-[0.9] mb-6">
              Insights & <br />
              <span className="font-serif italic lowercase font-normal text-secondary">updates</span>
            </h1>
            <p className="text-background/70 text-xl max-w-xl font-medium">
              Thoughts on design, printing technology, and building memorable brands.
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
                    ? "border-secondary text-secondary"
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

          {/* Sticky Left — active post detail */}
          <div className="hidden lg:block lg:col-span-4 relative border-r border-border">
            <div className="sticky top-[calc(4rem+49px)] h-[calc(100vh-4rem-49px)] flex flex-col px-8 xl:px-12 py-10 overflow-hidden">

              {/* Ghost word */}
              <div className="absolute inset-0 flex items-center pointer-events-none select-none overflow-hidden">
                <span className="text-[9vw] font-black uppercase tracking-tighter leading-none text-foreground/[0.025] whitespace-nowrap">
                  ARTICLE
                </span>
              </div>

              <div className="relative z-10 flex flex-col h-full">
                {active ? (
                  <div key={active.id} className="animate-fade-in flex flex-col h-full">
                    {/* Thumbnail */}
                    <div className="aspect-[16/9] w-full overflow-hidden mb-6 bg-muted relative group">
                      {active.imageUrl ? (
                        <img
                          src={active.imageUrl}
                          alt={active.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-foreground/10 font-black text-3xl uppercase tracking-tighter">
                          Octopus
                        </div>
                      )}
                      <div className="absolute inset-0 bg-foreground/10" />
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-block text-secondary font-mono text-[10px] font-bold uppercase tracking-widest">
                        {active.category.name}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(active.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold tracking-tight leading-snug mb-4 flex-grow-0">
                      {active.title}
                    </h2>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow line-clamp-4">
                      {active.excerpt}
                    </p>

                    {/* Counter */}
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-5">
                      {String(activeIndex + 1).padStart(2, "0")} / {String(filteredPosts.length).padStart(2, "0")}
                    </p>

                    <Link
                      to={`/blog/${active.slug}`}
                      className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest border-b-2 border-foreground pb-1 hover:text-secondary hover:border-secondary transition-colors w-fit group"
                    >
                      Read Article <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-muted-foreground font-mono text-xs uppercase tracking-widest">
                    No article selected
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Scrollable Right — article rows */}
          <div className="lg:col-span-8">
            {loading && posts.length === 0 ? (
              <div className="space-y-px bg-border">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-28 bg-background animate-pulse" />
                ))}
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="flex items-center justify-center py-32">
                <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest">No entries found.</p>
              </div>
            ) : (
              <>
                {filteredPosts.map((post, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <div
                      key={post.id}
                      ref={(el) => { itemRefs.current[i] = el; }}
                      className={`group border-b border-border transition-colors duration-300 ${
                        isActive ? "bg-secondary/5" : "hover:bg-muted/30"
                      }`}
                    >
                      <Link to={`/blog/${post.slug}`} className="flex items-stretch gap-0">
                        {/* Thumbnail */}
                        <div className="w-28 md:w-40 shrink-0 overflow-hidden relative self-stretch">
                          {post.imageUrl ? (
                            <img
                              src={post.imageUrl}
                              alt={post.title}
                              loading="lazy"
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center text-foreground/20 font-black text-lg uppercase tracking-tighter">
                              Ink
                            </div>
                          )}
                          <div className={`absolute inset-0 transition-colors ${isActive ? "bg-secondary/10" : "bg-transparent"}`} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 px-6 md:px-8 py-6 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <span className={`font-mono text-[9px] uppercase tracking-widest font-bold ${isActive ? "text-secondary" : "text-muted-foreground"}`}>
                                {post.category.name}
                              </span>
                              <span className="text-[9px] font-mono uppercase text-muted-foreground flex items-center gap-1">
                                <Calendar className="w-2.5 h-2.5" />
                                {new Date(post.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <h3 className={`font-bold text-base leading-snug line-clamp-2 mb-2 transition-colors ${
                              isActive ? "text-secondary" : "group-hover:text-secondary"
                            }`}>
                              {post.title}
                            </h3>
                            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                              {post.excerpt}
                            </p>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            <span className={`font-mono text-[9px] uppercase tracking-widest ${isActive ? "text-secondary" : "text-muted-foreground"}`}>
                              0{i + 1}
                            </span>
                            <ArrowUpRight className={`w-4 h-4 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${isActive ? "text-secondary" : "text-foreground/20"}`} />
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}

                {hasMore && (
                  <div className="px-8 py-8 border-t border-border flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {filteredPosts.length} articles loaded
                    </span>
                    <button
                      onClick={() => fetchBlogs()}
                      disabled={loading}
                      className="inline-flex items-center gap-2 border border-foreground/20 text-foreground px-6 py-2.5 text-xs font-bold uppercase tracking-wider hover:border-foreground hover:bg-foreground hover:text-background transition-colors disabled:opacity-50 group"
                    >
                      {loading ? "Loading..." : "Load Older Entries"}
                      {!loading && <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />}
                    </button>
                  </div>
                )}
              </>
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
