import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { apiUrl } from "@/constants/constants";

type PortfolioItem = {
  id: string;
  title: string;
  imageUrl: string;
  category: {
    name: string;
  };
};

const PortfolioPreview = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiUrl}/portfolio/featured`)
      .then((res) => res.json())
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block bg-primary text-primary-foreground px-4 py-2 text-sm font-bold uppercase tracking-wider mb-4 border-2 border-foreground">
            Our Work
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Featured <span className="text-primary">Portfolio</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A glimpse of our recent printing and design projects.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <Link
              key={item.id}
              to="/portfolio"
              className="group relative overflow-hidden border-2 border-foreground shadow-sm hover:shadow-md hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/60 transition-colors flex items-end">
                <div className="p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                  <span className="inline-block bg-secondary text-secondary-foreground px-2 py-1 text-xs font-bold uppercase border border-foreground mb-2">
                    {item.category.name}
                  </span>
                  <h3 className="text-background font-bold">
                    {item.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link to="/portfolio">
              View Full Portfolio
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioPreview;
