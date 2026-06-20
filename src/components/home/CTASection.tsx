import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, MessageCircle } from "lucide-react";

const CTASection = () => {
  const whatsappNumber = "919876543210";
  const whatsappMessage = encodeURIComponent("Hi! I'm interested in your printing services. Can you help me with a quote?");

  return (
    <section className="py-24 md:py-32 bg-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-bold text-primary-foreground tracking-tighter leading-none mb-8 uppercase">
            Ready to Bring Your Ideas to Life?
          </h2>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-12 max-w-2xl mx-auto font-medium">
            Let's create something amazing together. Get in touch for a free quote and consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              variant="default"
              size="xl"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-lg group transition-all duration-300 relative overflow-hidden"
              asChild
            >
              <Link to="/contact">
                <span className="relative z-10 flex items-center">
                  <Phone className="w-5 h-5 mr-2" />
                  Get a Quote
                </span>
              </Link>
            </Button>
            <Button
              variant="default"
              size="xl"
              className="bg-foreground text-background hover:bg-foreground/90 text-lg group transition-all duration-300 relative overflow-hidden"
              asChild
            >
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="relative z-10 flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp Us
                </span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
