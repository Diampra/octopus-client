import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, MessageCircle } from "lucide-react";

const CTASection = () => {
  const whatsappNumber = "919876543210";
  const whatsappMessage = encodeURIComponent("Hi! I'm interested in your printing services. Can you help me with a quote?");

  return (
    <section className="py-16 md:py-24 bg-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Bring Your Ideas to Life?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Let's create something amazing together. Get in touch for a free quote and consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="heroOutline"
              size="xl"
              className="bg-background text-foreground hover:bg-background/90"
              asChild
            >
              <Link to="/contact">
                <Phone className="w-5 h-5" />
                Get a Quote
              </Link>
            </Button>
            <Button
              variant="hero"
              size="xl"
              className="bg-secondary text-secondary-foreground"
              asChild
            >
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
