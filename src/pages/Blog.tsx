import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight, ArrowUpRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { apiUrl } from "@/constants/constants";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  imageUrl: string | null;
  category: {
    name: string;
    slug: string;
  };
  createdAt: string;
};

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  const categories = useMemo(() => {
    return [
      "All",
      ...Array.from(new Set(posts.map((p) => p.category.name))).sort(),
    ];
  }, [posts]);

  // Fetch blogs
  const fetchBlogs = async (initial = false) => {
    setLoading(true);

    const url = new URL(`${apiUrl}/blogs`);
    url.searchParams.set("limit", "9");
    if (!initial && cursor) {
      url.searchParams.set("cursor", cursor);
    }

    const res = await fetch(url.toString());
    const data = await res.json();

    setPosts((prev) => (initial ? data.items : [...prev, ...data.items]));
    setCursor(data.nextCursor);
    setHasMore(Boolean(data.nextCursor));

    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs(true);
  }, []);

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") return posts;
    return posts.filter((p) => p.category.name === activeCategory);
  }, [posts, activeCategory]);

  const featuredPost = filteredPosts[0];
  const regularPosts = filteredPosts.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16 md:pt-20">
        {/* HERO */}
        <section className="bg-background border-b-2 border-foreground py-24 md:py-32 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full text-center pointer-events-none select-none opacity-[0.03]">
            <span className="text-[25vw] font-black uppercase tracking-tighter leading-none text-foreground">
              JOURNAL
            </span>
          </div>

          <div className="container mx-auto px-4 text-center">
            <span className="inline-block bg-primary text-primary-foreground px-4 py-2 text-sm font-bold uppercase border-2 border-foreground mb-8">
              The Journal
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-bold uppercase tracking-tighter leading-none mb-6">
              Insights & <br />
              <span className="text-primary italic font-serif lowercase">Updates</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium">
              Thoughts on design, printing technology, and building memorable brands.
            </p>
          </div>
        </section>

        {/* CATEGORY FILTER */}
        <section className="py-8 border-b-2 border-foreground sticky top-16 z-30 bg-background/95 backdrop-blur-sm">
          <div className="container mx-auto px-4 flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 font-mono text-sm font-bold uppercase tracking-wider border-2 border-foreground transition-all ${
                  activeCategory === category
                    ? "bg-foreground text-background shadow-md"
                    : "bg-background hover:bg-accent text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* BLOG POSTS */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            {loading && posts.length === 0 ? (
              <p className="text-center text-muted-foreground font-mono text-lg uppercase">
                Loading journal entries...
              </p>
            ) : filteredPosts.length === 0 ? (
              <p className="text-center text-muted-foreground font-mono text-lg uppercase">
                No entries found.
              </p>
            ) : (
              <div className="flex flex-col gap-12 md:gap-24">
                
                {/* FEATURED POST (Latest) */}
                {featuredPost && (
                  <Link
                    to={`/blog/${featuredPost.slug}`}
                    className="group grid grid-cols-1 lg:grid-cols-2 gap-8 items-center border-2 border-foreground bg-card hover:shadow-md transition-all"
                  >
                    <div className="aspect-[4/3] lg:aspect-auto lg:h-full border-b-2 lg:border-b-0 lg:border-r-2 border-foreground overflow-hidden relative bg-muted">
                      {featuredPost.imageUrl ? (
                        <img
                          src={featuredPost.imageUrl}
                          alt={featuredPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground/30 font-black text-6xl uppercase tracking-tighter">
                          Octopus
                        </div>
                      )}
                      <div className="absolute inset-0 bg-primary/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <div className="p-8 md:p-16 flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-8">
                        <span className="inline-block px-3 py-1 text-xs font-bold font-mono uppercase tracking-widest border-2 border-foreground bg-secondary text-secondary-foreground">
                          {featuredPost.category.name}
                        </span>
                        <span className="text-muted-foreground text-sm font-mono uppercase tracking-wider flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(featuredPost.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter group-hover:text-primary transition-colors">
                        {featuredPost.title}
                      </h2>

                      <p className="text-muted-foreground text-xl mb-10 leading-relaxed font-medium line-clamp-3">
                        {featuredPost.excerpt}
                      </p>

                      <div className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-wider text-foreground group-hover:gap-4 transition-all">
                        Read Featured Article <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                )}

                {/* REGULAR POSTS GRID */}
                {regularPosts.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {regularPosts.map((post) => (
                      <BlogCard key={post.id} post={post} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {hasMore && (
              <div className="flex justify-center mt-24 pt-16 border-t-2 border-foreground">
                <button
                  onClick={() => fetchBlogs()}
                  disabled={loading}
                  className="px-12 py-4 border-4 border-foreground font-bold uppercase tracking-widest text-lg hover:bg-foreground hover:text-background transition-colors disabled:opacity-50"
                >
                  {loading ? "Loading..." : "Load Older Entries"}
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const BlogCard = ({ post }: { post: BlogPost }) => {
  return (
    <article className="h-full flex flex-col bg-card border-2 border-foreground group hover:-translate-y-2 hover:shadow-md transition-all">
      <div className="aspect-[4/3] border-b-2 border-foreground overflow-hidden relative bg-muted">
        {post.imageUrl ? (
          <img
            src={post.imageUrl}
            alt={post.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground/30 font-black text-4xl uppercase tracking-tighter">
            Octopus
          </div>
        )}
      </div>

      <div className="p-8 flex flex-col flex-grow">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="inline-block px-2 py-1 text-xs font-bold uppercase border-2 border-foreground bg-primary text-primary-foreground">
            {post.category.name}
          </span>
          <span className="flex items-center gap-1 text-xs font-mono uppercase text-muted-foreground">
            <Calendar className="w-3 h-3" />
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>

        <h3 className="text-2xl font-bold mb-4 tracking-tight group-hover:text-primary transition-colors line-clamp-2">
          <Link to={`/blog/${post.slug}`} className="before:absolute before:inset-0">
            {post.title}
          </Link>
        </h3>

        <p className="text-muted-foreground mb-8 line-clamp-3 leading-relaxed flex-grow">
          {post.excerpt}
        </p>

        <div className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-wider text-foreground group-hover:text-primary transition-colors mt-auto">
          Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
        </div>
      </div>
    </article>
  );
};

export default Blog;
