import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, X } from "lucide-react";
import { apiUrl } from "@/constants/constants";

type Category = {
  id: string;
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

const Portfolio = () => {
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [loading, setLoading] = useState(true);

  /* Fetch categories */
  useEffect(() => {
    fetch(`${apiUrl}/portfolio/categories`)
      .then((res) => res.json())
      .then((data: Category[]) =>
        setCategories(["All", ...data.map((c) => c.name)])
      );
  }, []);

  /* Fetch portfolio items */
  useEffect(() => {
    fetch(`${apiUrl}/portfolio`)
      .then((res) => res.json())
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  const filteredItems =
    activeCategory === "All"
      ? items
      : items.filter((i) => i.category.name === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16 md:pt-20">
        {/* HERO */}
        <section className="bg-foreground text-background py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-3xl">
            <span className="inline-block bg-primary text-primary-foreground px-4 py-2 text-sm font-bold uppercase border-2 border-background mb-4">
              Portfolio
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our <span className="text-primary">Work</span>
            </h1>
            <p className="text-xl text-background/80">
              A curated selection of printing & design projects delivered with
              precision and creativity.
            </p>
          </div>
        </section>

        {/* FILTER */}
        <section className="py-8 bg-accent border-b-2 border-foreground sticky top-16 z-30">
          <div className="container mx-auto px-4 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-4 py-2 text-sm font-bold uppercase border-2 border-foreground ${
                  activeCategory === c
                    ? "bg-primary text-primary-foreground"
                    : "bg-background hover:bg-accent"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </section>

        {/* GRID */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            {loading ? (
              <p className="text-center text-muted-foreground">
                Loading portfolio…
              </p>
            ) : filteredItems.length === 0 ? (
              <p className="text-center text-muted-foreground">
                No projects found.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="group text-left border-2 border-foreground hover:-translate-x-1 hover:-translate-y-1 transition-all"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>

                    <div className="p-4 bg-card">
                      <span className="inline-block bg-secondary text-secondary-foreground px-2 py-1 text-xs font-bold uppercase border border-foreground mb-2">
                        {item.category.name}
                      </span>
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">
                        {item.client}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-secondary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-secondary-foreground mb-6">
              Like What You See?
            </h2>
            <p className="text-xl text-secondary-foreground/90 mb-8 max-w-2xl mx-auto">
              Let’s create something powerful for your brand.
            </p>
            <Button variant="outline" size="xl" className="bg-background" asChild>
              <Link to="/contact">
                Start Your Project <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />

      {/* MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/80">
          <div className="bg-background border-2 border-foreground max-w-3xl w-full max-h-[90vh] overflow-auto">
            <div className="relative">
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.title}
                className="w-full aspect-video object-cover"
              />
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-background border-2 border-foreground flex items-center justify-center hover:bg-accent"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <span className="inline-block bg-secondary text-secondary-foreground px-3 py-1 text-sm font-bold uppercase border border-foreground mb-3">
                {selectedItem.category.name}
              </span>
              <h3 className="text-2xl font-bold mb-2">
                {selectedItem.title}
              </h3>
              <p className="text-muted-foreground mb-4">
                Client: {selectedItem.client}
              </p>
              <p className="text-muted-foreground mb-6">
                {selectedItem.description}
              </p>
              <Button asChild>
                <Link to="/contact">
                  Request Similar Project <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
