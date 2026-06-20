import { useEffect, useState } from "react";
import { Star, Quote, UserCircle } from "lucide-react";
import { apiUrl } from "@/constants/constants";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
      .catch((e) => console.error("Error fetching testimonials", e))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;
  if (testimonials.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-accent relative overflow-hidden">
      <div className="bg-typography text-9xl top-10 left-[-10%] text-foreground/5">TESTIMONIALS</div>
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block bg-secondary text-secondary-foreground px-4 py-2 text-sm font-bold uppercase tracking-wider mb-4 border-2 border-foreground shadow-sm hover-lift-card">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            What Our <span className="text-secondary">Clients Say</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Don&apos;t just take our word for it - hear from our satisfied customers who trust us with their premium printing and branding needs.
          </p>
        </div>

        {/* Interactive Carousel */}
        <div className="px-12 md:px-20 max-w-6xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/3">
                  <div className="bg-background border-2 border-foreground p-8 shadow-sm h-full flex flex-col relative group hover-lift-card">
                    <Quote className="w-12 h-12 text-secondary/10 absolute top-4 right-4 transition-transform duration-500 group-hover:scale-125 group-hover:text-secondary/20" />

                    <div className="flex gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-secondary text-secondary"
                        />
                      ))}
                    </div>

                    <p className="text-foreground/90 font-medium mb-8 flex-grow text-lg italic relative z-10">
                      "{testimonial.content}"
                    </p>

                    <div className="flex items-center gap-4 mt-auto pt-4 border-t-2 border-foreground/10">
                      <div className="w-12 h-12 bg-accent rounded-full border-2 border-foreground flex items-center justify-center overflow-hidden">
                        <UserCircle className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-bold text-lg leading-tight">{testimonial.name}</p>
                        <p className="text-sm text-secondary font-medium uppercase tracking-wider">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="w-12 h-12 border-2 border-foreground hover:bg-secondary hover:text-secondary-foreground hidden sm:flex -left-16" />
            <CarouselNext className="w-12 h-12 border-2 border-foreground hover:bg-secondary hover:text-secondary-foreground hidden sm:flex -right-16" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
