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
      fetch(`${apiUrl}/blogs`).then((r) => r.json()),
      fetch(`${apiUrl}/categories`).then((r) => r.json()),
    ])
      .then(([postData, allPosts, cats]) => {
        setPost(postData);
        setCategories(cats);

        setRelatedPosts(
          allPosts.filter(
            (p: BlogPost) =>
              p.category.name === postData.category.name &&
              p.slug !== postData.slug
          ).slice(0, 2)
        );
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 text-center text-muted-foreground">
          Loading…
        </div>
        <Footer />
      </div>
    );
  }

  if (notFound || !post) {
    return <Navigate to="/blog" replace />;
  }
  const shareUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent(post?.title ?? "");
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 md:pt-24">
        {/* HERO */}
        <section className="bg-primary text-primary-foreground py-12 md:py-20 border-b-4 border-foreground">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 opacity-80 hover:opacity-100"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
              
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase border-2 border-foreground bg-background text-foreground">
                {post.category.name}
              </span>
            </div>


            <h1 className="text-3xl md:text-5xl font-bold max-w-4xl mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap gap-6 text-sm opacity-90">
              <span className="flex items-center gap-2">
                <User className="w-5 h-5" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {post.readTime}
              </span>
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* MAIN */}
            <article className="lg:col-span-8 border-l-4 border-foreground pl-6">
{post.imageUrl && (
  <figure className="mb-10">
    <img
      src={post.imageUrl}
      alt={post.title}
      className="rounded border-2 border-foreground"
    />
    <figcaption className="mt-2 text-xs text-muted-foreground">
      {post.title}
    </figcaption>
  </figure>
)}

              <div className="prose prose-lg prose-headings:font-bold prose-headings:tracking-tight prose-p:text-muted-foreground max-w-none">
                {post.content.split("\n").map((p, i) => {
                  if (p.startsWith("## "))
                    return (
                      <h2 key={i}>{p.replace("## ", "")}</h2>
                    );
                  if (p.startsWith("### "))
                    return (
                      <h3 key={i}>{p.replace("### ", "")}</h3>
                    );
                  if (p.startsWith("- "))
                    return <li key={i}>{p.replace("- ", "")}</li>;
                  if (!p.trim()) return <div key={i} className="h-4" />;
                  return <p key={i}>{p}</p>;
                })}
              </div>

              {/* SHARE */}
<div className="border-t-2 border-foreground mt-12 pt-8">
  <div className="flex items-center gap-4">
    <span className="font-bold flex items-center gap-2">
      <Share2 className="w-5 h-5" />
      Share:
    </span>

    <a
      href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-primary"
    >
      <Facebook />
    </a>

    <a
      href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-primary"
    >
      <Twitter />
    </a>

    <a
      href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-primary"
    >
      <Linkedin />
    </a>
  </div>
</div>

            </article>

            {/* SIDEBAR */}
            <aside className="lg:col-span-4 space-y-8 sticky top-24">
              {/* CTA */}
              <div className="bg-primary text-primary-foreground p-6 border-2 border-foreground">
                <h3 className="font-bold text-xl mb-3">Ready to Print?</h3>
                <p className="opacity-90 mb-4">
                  Get a free quote for your next project.
                </p>
                <Button variant="secondary" asChild>
                  <Link to="/contact">Get a Quote</Link>
                </Button>
              </div>

              {/* RELATED */}
              {relatedPosts.length > 0 && (
                <div className="border-2 border-foreground p-6 bg-card">
                  <h3 className="font-bold mb-4 border-b-2 pb-2">
                    Related Articles
                  </h3>
                  {relatedPosts.map((r) => (
                    <Link
                      key={r.id}
                      to={`/blog/${r.slug}`}
                      className="block mb-3 hover:text-primary"
                    >
                      <strong>{r.title}</strong>
                      <p className="text-sm text-muted-foreground">
                        {r.excerpt}
                      </p>
                    </Link>
                  ))}
                </div>
              )}

              {/* CATEGORIES */}
              <div className="border-2 border-foreground p-6">
                <h3 className="font-bold mb-4 border-b-2 pb-2">
                  Categories
                </h3>
                {categories.map((c) => (
                  <Link
                    key={c.id}
                    to="/blog"
                    className="block hover:text-primary"
                  >
                    {c.name}
                  </Link>
                ))}
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
