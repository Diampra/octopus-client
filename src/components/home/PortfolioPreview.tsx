import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight } from "lucide-react";
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
      .then((data) => setItems(data.slice(0, 4))) // Only take up to 4 for the showcase
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;

  return (
    <section className="py-24 bg-background border-t-2 border-foreground relative overflow-hidden">
      {/* Decorative lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-24 bg-foreground" />
      
      <div className="container mx-auto px-4 mt-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 border-b-2 border-foreground pb-8">
          <div className="max-w-2xl">
            <span className="inline-block text-primary font-mono text-sm uppercase tracking-widest mb-4">
              [ 03 / Showcase ]
            </span>
            <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-none">
              Selected <span className="text-primary italic font-serif lowercase">Works</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-md text-right hidden md:block">
            A curated selection of our most impactful printing and branding projects.
          </p>
        </div>

        {/* Showcase Grid (Staggered Layout) */}
        <div className="flex flex-col gap-12 md:gap-24">
          {items.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <Link
                key={item.id}
                to="/portfolio"
                className={`group flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16`}
              >
                {/* Image Area */}
                <div className={`w-full md:w-3/5 relative overflow-hidden border-2 border-foreground shadow-sm bg-muted ${isEven ? 'md:mr-auto' : 'md:ml-auto'}`}>
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-primary/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Text Area */}
                <div className="w-full md:w-2/5 flex flex-col justify-center">
                  <span className="inline-block border border-foreground px-3 py-1 text-xs font-mono font-bold uppercase mb-4 self-start bg-secondary text-secondary-foreground">
                    {item.category.name}
                  </span>
                  
                  <h3 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-muted-foreground mt-4 group-hover:text-foreground transition-colors">
                    View Project <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-24 text-center border-t-2 border-foreground pt-16">
          <h3 className="text-3xl font-bold mb-8">Want to see more?</h3>
          <Button variant="default" size="xl" className="border-2 border-foreground shadow-sm hover:shadow-md transition-all text-lg btn-arrow-hover" asChild>
            <Link to="/portfolio">
              Explore Full Archive
              <ArrowRight className="w-5 h-5 ml-2 arrow-icon" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioPreview;
