import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import { apiUrl } from "@/constants/constants";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
};

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiUrl}/testimonials/featured`)
      .then((r) => r.json())
      .then((data) => setTestimonials(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null; // or skeleton later
  if (testimonials.length === 0) return null; // hide section if none featured

  return (
    <section className="py-16 md:py-24 bg-foreground text-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block bg-secondary text-secondary-foreground px-4 py-2 text-sm font-bold uppercase tracking-wider mb-4 border-2 border-background shadow-sm">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            What Our <span className="text-secondary">Clients Say</span>
          </h2>
          <p className="text-background/80 text-lg max-w-2xl mx-auto">
            Don&apos;t just take our word for it — hear from our satisfied customers.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-background text-foreground border-2 border-background p-6 relative shadow-sm"
            >
              <Quote className="w-10 h-10 text-primary/20 absolute top-4 right-4" />

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-secondary text-secondary"
                  />
                ))}
              </div>

              <p className="text-muted-foreground mb-6 relative z-10">
                “{testimonial.content}”
              </p>

              <div className="border-t-2 border-border pt-4">
                <p className="font-bold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
