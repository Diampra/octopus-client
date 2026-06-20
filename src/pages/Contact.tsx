import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin, MessageCircle, Clock, Send, Star, CheckCircle, ArrowRight, Shield } from "lucide-react";

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
      <main className="pt-16 md:pt-20 relative overflow-hidden">
        {/* Hero Section */}
        <section className="bg-background py-24 md:py-32 relative z-10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <span className="inline-block text-primary font-mono text-sm uppercase tracking-widest mb-6">
                Contact Us
              </span>
              <h1 className="text-5xl md:text-7xl font-light tracking-tighter leading-none mb-6">
                Let's <span className="font-bold">Connect</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed">
                Have a project in mind? Get in touch with us for a free consultation and custom quote. We're here to help bring your ideas to life.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 md:py-24 relative z-10">
          <div className="container mx-auto px-4">
            
            {/* Trust Signals Strip */}
            <div className="flex flex-wrap gap-4 md:gap-8 justify-center items-center mb-16 py-8">
              <div className="flex items-center gap-2 font-medium text-sm md:text-base text-muted-foreground"><MessageCircle className="w-5 h-5 text-primary" /> Trusted by 500+ Businesses</div>
              <div className="hidden md:block w-1.5 h-1.5 bg-muted-foreground/30 rounded-full"></div>
              <div className="flex items-center gap-2 font-medium text-sm md:text-base text-muted-foreground"><Clock className="w-5 h-5 text-primary" /> 10+ Years Experience</div>
              <div className="hidden md:block w-1.5 h-1.5 bg-muted-foreground/30 rounded-full"></div>
              <div className="flex items-center gap-2 font-medium text-sm md:text-base text-muted-foreground"><MapPin className="w-5 h-5 text-primary" /> 3000+ Projects Delivered</div>
              <div className="hidden md:block w-1.5 h-1.5 bg-muted-foreground/30 rounded-full"></div>
              <div className="flex items-center gap-2 font-medium text-sm md:text-base text-muted-foreground"><Star className="w-5 h-5 text-primary fill-primary" /> 4.9/5 Client Satisfaction</div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
              
              {/* Contact Form - Primary Focus */}
              <div className="lg:col-span-7 bg-muted/30 p-8 md:p-12 rounded-3xl">
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">Start Your Project</h2>
                    <p className="text-muted-foreground font-medium flex items-center gap-2 text-sm">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                      </span>
                      Average reply within 30 minutes
                    </p>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold">
                    <CheckCircle className="w-4 h-4" /> Free Consultation
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="font-bold uppercase tracking-wider text-xs text-muted-foreground">
                        Your Name *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="mt-2 bg-background border-border h-12 rounded-lg"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="font-bold uppercase tracking-wider text-xs text-muted-foreground">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="mt-2 bg-background border-border h-12 rounded-lg"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone" className="font-bold uppercase tracking-wider text-xs text-muted-foreground">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="mt-2 bg-background border-border h-12 rounded-lg"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <Label htmlFor="service" className="font-bold uppercase tracking-wider text-xs text-muted-foreground">
                        Service Required
                      </Label>
                      <select
                        id="service"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="mt-2 w-full h-12 px-3 border border-border rounded-lg bg-background font-medium text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
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
                    <Label htmlFor="message" className="font-bold uppercase tracking-wider text-xs text-muted-foreground">
                      Your Message *
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className="mt-2 min-h-32 bg-background border-border rounded-lg resize-y"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <Button type="submit" variant="default" size="lg" disabled={isSubmitting} className="w-full text-lg h-14 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl group transition-all mt-4">
                    <span className="flex items-center gap-2">
                      {isSubmitting ? "Sending..." : "Get Free Quote"}
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                  
                  <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground font-medium pt-4">
                    <span className="flex items-center gap-1"><Shield className="w-4 h-4" /> No spam. Response within 24 hours.</span>
                    <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Custom quote tailored to your needs.</span>
                  </div>
                </form>
              </div>

              {/* Side Information - Secondary & Tertiary */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                
                {/* WhatsApp CTA - Primary Focus */}
                <div className="bg-[#25D366] text-white p-8 rounded-3xl shadow-lg relative overflow-hidden group cursor-pointer transition-transform hover:-translate-y-1" onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, "_blank")}>
                  <div className="absolute right-[-20px] top-[-20px] opacity-10 group-hover:scale-110 transition-transform duration-500">
                    <MessageCircle className="w-48 h-48" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 flex items-center gap-2 relative z-10">
                    <MessageCircle className="w-8 h-8" /> 
                    Fastest Response
                  </h3>
                  <p className="text-white/90 mb-8 font-medium relative z-10 text-lg">
                    Need an immediate quote? Chat directly with our team on WhatsApp for same-day response.
                  </p>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full bg-white text-[#25D366] hover:bg-white/90 hover:text-[#25D366] border-none rounded-xl font-bold"
                    asChild
                  >
                    <div>
                      Chat on WhatsApp
                    </div>
                  </Button>
                </div>

                {/* Secondary Contact Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {contactInfo.map((info, index) => (
                    <div
                      key={index}
                      className="bg-muted/30 p-6 rounded-2xl transition-colors hover:bg-muted/50"
                    >
                      <div className="w-12 h-12 text-primary flex items-center mb-4">
                        <info.icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-base mb-1">{info.title}</h3>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-sm text-muted-foreground">{detail}</p>
                      ))}
                    </div>
                  ))}
                </div>
                                
                {/* Google Map */}
                <div className="rounded-2xl overflow-hidden h-full min-h-[250px] shadow-sm border border-border">
                  <iframe
                    title="Octopus Inc Patna Location"
                    src="https://www.google.com/maps?q=Octopus+Inc,+Patna,+Bihar&z=15&output=embed"
                    className="w-full h-full min-h-[250px]"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
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
