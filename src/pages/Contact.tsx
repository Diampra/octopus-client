import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin, MessageCircle, Clock, ArrowRight, Shield, CheckCircle } from "lucide-react";
import SEO from "@/components/SEO";

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
      <SEO
        title="Contact Us - Octopus"
        description="Get in touch with Octopus for a free consultation and custom quote for your printing and branding projects."
        url="https://octopus.in/contact"
      />
      <Header />

      <main className="pt-16 md:pt-20">
        <section className="bg-background relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">

            {/* ── STICKY LEFT — contact info ── */}
            <div className="lg:col-span-5 relative border-r border-border bg-foreground text-background">
              <div className="sticky top-16 h-auto lg:h-[calc(100vh-4rem)] flex flex-col justify-between px-6 xl:px-14 py-16 overflow-y-auto scrollbar-hide">

                {/* Ghost word */}
                <div className="absolute inset-0 flex items-center pointer-events-none select-none overflow-hidden">
                  <span className="text-[14vw] font-black uppercase tracking-tighter leading-none text-background/[0.025] whitespace-nowrap">
                    HELLO
                  </span>
                </div>

                <div className="relative z-10 mb-16">
                  <span className="inline-block bg-primary text-primary-foreground px-4 py-2 text-xs font-bold uppercase tracking-wider mb-6 border-2 border-background">
                    [ Contact / Get in touch ]
                  </span>

                  <h1 className="text-5xl xl:text-6xl font-bold uppercase tracking-tighter leading-[0.9] mb-6">
                    Start a <br />
                    <span className="font-serif italic lowercase font-normal text-primary">project</span>
                  </h1>

                  <p className="text-lg text-background/70 font-medium leading-relaxed max-w-md">
                    Have a project in mind? Get in touch with us for a free consultation and custom quote. We're here to help bring your ideas to life.
                  </p>
                </div>

                {/* Contact Info List */}
                <div className="relative z-10 grid gap-8">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-10 h-10 border border-background/20 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-widest text-background/50 mb-1">
                            {info.title}
                          </p>
                          {info.details.map((detail, i) => (
                            <p key={i} className="text-sm text-background/90 font-medium leading-relaxed">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ── SCROLLABLE RIGHT — form & map ── */}
            <div className="lg:col-span-7 bg-background">
              <div className="p-6 md:p-12 xl:p-20">

                {/* Trust strip */}
                <div className="flex flex-wrap gap-x-6 gap-y-3 mb-12 border-b border-border pb-8">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"><MessageCircle className="w-3 h-3 text-foreground" /> Trusted by 500+</div>
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"><Clock className="w-3 h-3 text-foreground" /> 10+ Yrs Exp</div>
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"><CheckCircle className="w-3 h-3 text-foreground" /> 4.9/5 Rating</div>
                </div>

                {/* Form Wrapper */}
                <div className="mb-12">
                  <div className="flex justify-between items-end mb-8">
                    <div>
                      <h2 className="text-3xl font-bold tracking-tight uppercase">Send a Message</h2>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                      </span>
                      Replies in ~30 mins
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="font-mono text-[10px] uppercase tracking-widest font-bold text-foreground">
                          Your Name *
                        </label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="rounded-none border-foreground/20 h-12 focus-visible:ring-0 focus-visible:border-foreground transition-colors bg-background"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="font-mono text-[10px] uppercase tracking-widest font-bold text-foreground">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="rounded-none border-foreground/20 h-12 focus-visible:ring-0 focus-visible:border-foreground transition-colors bg-background"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="phone" className="font-mono text-[10px] uppercase tracking-widest font-bold text-foreground">
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="rounded-none border-foreground/20 h-12 focus-visible:ring-0 focus-visible:border-foreground transition-colors bg-background"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="service" className="font-mono text-[10px] uppercase tracking-widest font-bold text-foreground">
                          Service Required
                        </label>
                        <select
                          id="service"
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full h-12 px-3 border border-foreground/20 rounded-none bg-background text-sm focus:border-foreground focus:outline-none transition-colors appearance-none"
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

                    <div className="space-y-2">
                      <label htmlFor="message" className="font-mono text-[10px] uppercase tracking-widest font-bold text-foreground">
                        Your Message *
                      </label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        className="min-h-32 rounded-none border-foreground/20 focus-visible:ring-0 focus-visible:border-foreground transition-colors bg-background resize-y"
                        placeholder="Tell us about your project..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 bg-foreground text-background hover:bg-foreground/90 rounded-none uppercase font-bold tracking-widest text-xs group transition-all mt-4"
                    >
                      <span className="flex items-center justify-center gap-2">
                        {isSubmitting ? "Sending..." : "Get Free Quote"}
                        {!isSubmitting && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                      </span>
                    </Button>

                    <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground pt-2">
                      <Shield className="w-3 h-3" /> No spam. Custom quotes only.
                    </div>
                  </form>
                </div>

                {/* WhatsApp block — Brutalist */}
                <div
                  className="border-2 border-[#25D366] bg-[#25D366]/5 p-8 mb-12 cursor-pointer group hover:bg-[#25D366] transition-colors duration-300"
                  onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, "_blank")}
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <MessageCircle className="w-6 h-6 text-[#25D366] group-hover:text-background transition-colors" />
                        <h3 className="text-xl font-bold uppercase tracking-tight group-hover:text-background transition-colors">
                          WhatsApp Us
                        </h3>
                      </div>
                      <p className="text-muted-foreground text-sm max-w-sm group-hover:text-background/80 transition-colors">
                        Need an immediate quote? Chat directly with our team for a same-day response.
                      </p>
                    </div>
                    <div className="shrink-0 flex items-center justify-center w-12 h-12 border-2 border-[#25D366] text-[#25D366] group-hover:border-background group-hover:text-background transition-colors">
                      <ArrowRight className="w-5 h-5 -rotate-45" />
                    </div>
                  </div>
                </div>

                {/* Google Map — Sharp edges */}
                <div className="border border-border h-[400px]">
                  <iframe
                    title="Octopus Inc Patna Location"
                    src="https://www.google.com/maps?q=Octopus+Inc,+Patna,+Bihar&z=15&output=embed"
                    className="w-full h-full filter grayscale hover:grayscale-0 transition-all duration-700"
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
