import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight } from "lucide-react";
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
    id: string;
    name: string;
  };
  createdAt: string;
};

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  // Fetch categories
  useEffect(() => {
    fetch(`${apiUrl}/categories`)
      .then((res) => res.json())
      .then((data) =>
        setCategories(["All", ...data.map((c: any) => c.name)])
      );
  }, []);

  // Fetch blogs
  useEffect(() => {
    fetch(`${apiUrl}/blogs`)
      .then((res) => res.json())
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.category.name === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 md:pt-24">
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-16 border-b-4 border-foreground">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Blog</h1>
            <p className="text-xl max-w-2xl mx-auto opacity-90">
              Printing tips, design trends, and company updates.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 border-b-2 border-foreground">
          <div className="container mx-auto px-4 flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 font-medium uppercase text-sm border-2 border-foreground ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-background hover:bg-accent"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {loading ? (
              <p className="text-center text-muted-foreground">
                Loading posts…
              </p>
            ) : filteredPosts.length === 0 ? (
              <p className="text-center text-muted-foreground">
                No posts found.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
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
    <article className="bg-card border-2 border-foreground group hover:-translate-y-1 transition-transform">
      <div className="aspect-video border-b-2 border-foreground overflow-hidden">
        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="p-6">
<span className="inline-block px-3 py-1 text-xs font-bold uppercase border-2 border-foreground bg-secondary text-secondary-foreground">
  {post.category.name}
</span>


        <h3 className="text-xl font-bold mb-3 group-hover:text-primary">
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>

        <p className="text-muted-foreground mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <User className="w-4 h-4" />
            Octopus Inc.
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>

        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 font-bold text-primary hover:gap-3"
        >
          Read More <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
};

export default Blog;
