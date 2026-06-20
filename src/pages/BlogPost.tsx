import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { apiUrl } from "@/constants/constants";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl: string | null;
  author: string;
  readTime: string;
  createdAt: string;
  category: {
    id: string;
    name: string;
  };
};
const BlogPostSkeleton = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16 md:pt-20">
        {/* HERO SKELETON */}
        <section className="bg-foreground py-24 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10 animate-pulse">
            <div className="h-6 w-24 bg-background/20 mb-8" />
            <div className="h-12 md:h-20 lg:h-24 w-3/4 max-w-4xl bg-background/20 mb-8" />
            <div className="flex gap-6">
              <div className="h-4 w-24 bg-background/20" />
              <div className="h-4 w-24 bg-background/20" />
              <div className="h-4 w-24 bg-background/20" />
            </div>
          </div>
        </section>

        {/* CONTENT SKELETON */}
        <section className="border-t border-border">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* MAIN */}
            <article className="lg:col-span-8 p-8 md:p-12 xl:p-16 border-r border-border bg-background animate-pulse">
              {/* Image */}
              <div className="w-full aspect-video bg-muted mb-12" />

              {/* Paragraphs */}
              <div className="space-y-6">
                <div className="h-4 bg-muted w-full" />
                <div className="h-4 bg-muted w-11/12" />
                <div className="h-4 bg-muted w-10/12" />
                <div className="h-4 bg-muted w-full" />
                <div className="h-4 bg-muted w-9/12" />
              </div>
            </article>

            {/* SIDEBAR */}
            <aside className="lg:col-span-4 bg-muted/30">
              <div className="p-8 md:p-12 animate-pulse space-y-8">
                <div className="h-48 bg-muted" />
                <div className="h-40 bg-muted" />
                <div className="h-40 bg-muted" />
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  // const shareUrl = encodeURIComponent(window.location.href);
  // const shareText = encodeURIComponent(post.title);
  useEffect(() => {
    if (!slug) return;

    Promise.all([
      fetch(`${apiUrl}/blogs/${slug}`).then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      }),
      fetch(`${apiUrl}/blogs?limit=20`)
        .then((r) => r.json())
        .then((d) => d.items),
      fetch(`${apiUrl}/categories`).then((r) => r.json()),
    ])
      .then(([postData, allPosts, cats]) => {
        setPost(postData);
        setCategories(cats);

        setRelatedPosts(
          allPosts
            .filter(
              (p: BlogPost) =>
                p.category.name === postData.category.name &&
                p.slug !== postData.slug
            )
            .slice(0, 2)
        );
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
  return <BlogPostSkeleton />;
  }

  if (notFound || !post) {
    return <Navigate to="/blog" replace />;
  }
  const shareUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent(post?.title ?? "");
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16 md:pt-20">
        {/* HERO */}
        <section className="bg-foreground text-background py-24 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <span className="text-[20vw] font-black uppercase tracking-tighter leading-none text-background/[0.03] whitespace-nowrap">
              ARTICLE
            </span>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-background/50 hover:text-background font-mono text-sm uppercase tracking-widest transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Link>
              
              <span className="inline-block bg-primary text-primary-foreground px-4 py-2 text-xs font-bold uppercase tracking-wider border-2 border-background">
                {post.category.name}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter leading-[0.9] mb-8 max-w-5xl">
              {post.title}
            </h1>

            <div className="flex flex-wrap gap-6 font-mono text-xs uppercase tracking-widest text-background/60">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="border-t border-border">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* MAIN */}
            <article className="lg:col-span-8 p-8 md:p-12 xl:p-16 border-r border-border bg-background">
              {post.imageUrl && (
                <figure className="mb-12">
                  <div className="aspect-video w-full overflow-hidden bg-muted">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <figcaption className="mt-4 text-xs font-mono uppercase tracking-widest text-muted-foreground text-center">
                    {post.title}
                  </figcaption>
                </figure>
              )}

              <div className="prose prose-lg md:prose-xl prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-tighter prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-primary hover:prose-a:text-foreground max-w-none">
                {post.content.split("\n").map((p, i) => {
                  if (p.startsWith("## "))
                    return (
                      <h2 key={i} className="mt-12 mb-6">{p.replace("## ", "")}</h2>
                    );
                  if (p.startsWith("### "))
                    return (
                      <h3 key={i} className="mt-8 mb-4">{p.replace("### ", "")}</h3>
                    );
                  if (p.startsWith("- "))
                    return <li key={i}>{p.replace("- ", "")}</li>;
                  if (!p.trim()) return <div key={i} className="h-6" />;
                  return <p key={i}>{p}</p>;
                })}
              </div>

              {/* SHARE */}
              <div className="border-t border-border mt-16 pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <span className="font-mono text-sm font-bold uppercase tracking-widest text-foreground">
                  Share this article
                </span>
                <div className="flex items-center gap-4">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-foreground hover:text-background hover:border-foreground transition-all"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>

                  <a
                    href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-foreground hover:text-background hover:border-foreground transition-all"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>

                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-foreground hover:text-background hover:border-foreground transition-all"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </article>

            {/* SIDEBAR */}
            <aside className="lg:col-span-4 bg-muted/30">
              <div className="sticky top-[5rem]">
                
                {/* CTA */}
                <div className="p-8 md:p-12 border-b border-border bg-foreground text-background">
                  <h3 className="font-bold text-3xl uppercase tracking-tighter mb-4">
                    Ready to <br/> <span className="text-primary italic font-serif lowercase font-normal">Start?</span>
                  </h3>
                  <p className="text-background/70 mb-8 font-medium">
                    Let's bring your brand vision to life with our premium printing solutions.
                  </p>
                  <Link 
                    to="/contact"
                    className="inline-flex w-full items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-4 font-mono text-sm font-bold uppercase tracking-widest hover:bg-background hover:text-foreground transition-colors group"
                  >
                    Get a Quote
                    <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* RELATED */}
                {relatedPosts.length > 0 && (
                  <div className="p-8 md:p-12 border-b border-border">
                    <h3 className="font-mono text-sm font-bold uppercase tracking-widest mb-8 text-foreground">
                      Related Articles
                    </h3>
                    <div className="space-y-8">
                      {relatedPosts.map((r) => (
                        <Link
                          key={r.id}
                          to={`/blog/${r.slug}`}
                          className="block group"
                        >
                          <h4 className="text-xl font-bold tracking-tight mb-2 group-hover:text-primary transition-colors">
                            {r.title}
                          </h4>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {r.excerpt}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* CATEGORIES */}
                <div className="p-8 md:p-12">
                  <h3 className="font-mono text-sm font-bold uppercase tracking-widest mb-8 text-foreground">
                    Categories
                  </h3>
                  <div className="flex flex-col gap-4">
                    {categories.map((c) => (
                      <Link
                        key={c.id}
                        to="/blog"
                        className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all flex items-center gap-2 group"
                      >
                        <ArrowLeft className="w-3 h-3 rotate-180 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-primary" />
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </div>

              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPostPage;
