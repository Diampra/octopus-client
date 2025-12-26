import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin, MessageCircle, Clock, Send } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["B61, First Floor, Mauryalok Shopping Complex, Budh Marg, Patna. (Bihar) India.", "800001"],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+91 8092207196", "+91 9312699450"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["info@octopusinc.in", "sales@octopusinc.in"],
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: ["Mon - Sat: 9AM - 7PM", "Sunday: Closed"],
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });
    
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  const whatsappNumber = "919312699450";
  const whatsappMessage = encodeURIComponent("Hi! I'm interested in your printing services. Can you help me with a quote?");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="bg-foreground text-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <span className="inline-block bg-secondary text-secondary-foreground px-4 py-2 text-sm font-bold uppercase tracking-wider mb-4 border-2 border-background shadow-sm">
                Contact Us
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Let's <span className="text-secondary">Connect</span>
              </h1>
              <p className="text-xl text-background/80">
                Have a project in mind? Get in touch with us for a free consultation and quote. We're here to help bring your ideas to life.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              {/* Contact Form */}
              <div className="bg-card border-2 border-foreground p-6 md:p-8 shadow-md">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="font-bold uppercase tracking-wider text-sm">
                        Your Name *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="mt-2 border-2 border-foreground"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="font-bold uppercase tracking-wider text-sm">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="mt-2 border-2 border-foreground"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone" className="font-bold uppercase tracking-wider text-sm">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="mt-2 border-2 border-foreground"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <Label htmlFor="service" className="font-bold uppercase tracking-wider text-sm">
                        Service Required
                      </Label>
                      <select
                        id="service"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="mt-2 w-full h-10 px-3 border-2 border-foreground bg-background"
                      >
                        <option value="">Select a service</option>
                        <option value="visiting-cards">Visiting Cards</option>
                        <option value="brochures">Brochures & Catalogues</option>
                        <option value="banners">Banners & Flex</option>
                        <option value="logo-design">Logo & Branding</option>
                        <option value="stickers">Stickers & Labels</option>
                        <option value="uv-acrylic">UV & Acrylic Prints</option>
                        <option value="packaging">Packaging</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message" className="font-bold uppercase tracking-wider text-sm">
                      Your Message *
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className="mt-2 min-h-32 border-2 border-foreground"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <Button type="submit" variant="default" size="lg" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>

              {/* Contact Info */}
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {contactInfo.map((info, index) => (
                    <div
                      key={index}
                      className="bg-accent border-2 border-foreground p-6 shadow-sm"
                    >
                      <div className="w-12 h-12 bg-primary text-primary-foreground border-2 border-foreground flex items-center justify-center mb-4">
                        <info.icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{info.title}</h3>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-muted-foreground">{detail}</p>
                      ))}
                    </div>
                  ))}
                </div>

                {/* WhatsApp CTA */}
                <div className="bg-secondary text-secondary-foreground border-2 border-foreground p-6 shadow-md">
                  <h3 className="text-xl font-bold mb-4">Quick Connect via WhatsApp</h3>
                  <p className="text-secondary-foreground/90 mb-6">
                    Need a quick response? Chat with us directly on WhatsApp for instant quotes and support.
                  </p>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full bg-background text-foreground"
                    asChild
                  >
                    <a
                      href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Chat on WhatsApp
                    </a>
                  </Button>
                </div>
                                
                {/* Google Map */}
                <div className="mt-8 border-2 border-foreground shadow-sm overflow-hidden rounded-lg">
                  <div className="aspect-video">
                    <iframe
                      title="Octopus Inc Patna Location"
                      src="https://www.google.com/maps?q=Octopus+Inc,+Patna,+Bihar&z=15&output=embed"
                      className="w-full h-full"
                      style={{ border: 0 }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
