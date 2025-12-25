import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Target, Eye, Users, Award, Clock, Lightbulb } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const values = [
  {
    icon: Award,
    title: "Quality First",
    description: "We never compromise on quality. Every print, every design reflects our commitment to excellence.",
  },
  {
    icon: Lightbulb,
    title: "Creative Excellence",
    description: "Our team of creative designers bring fresh ideas and innovative solutions to every project.",
  },
  {
    icon: Clock,
    title: "Timely Delivery",
    description: "We understand deadlines matter. We deliver on time, every time, without compromising quality.",
  },
  {
    icon: Users,
    title: "Customer Focus",
    description: "Your satisfaction is our priority. We work closely with you to bring your vision to life.",
  },
];

const stats = [
  { value: "10+", label: "Years of Experience" },
  { value: "500+", label: "Projects Completed" },
  { value: "200+", label: "Happy Clients" },
  { value: "50+", label: "Team Members" },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="bg-foreground text-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <span className="inline-block bg-secondary text-secondary-foreground px-4 py-2 text-sm font-bold uppercase tracking-wider mb-4 border-2 border-background shadow-sm">
                  About Us
                </span>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Your Creative <span className="text-secondary">Partner</span>
                </h1>
                <p className="text-xl text-background/80 mb-6">
                  Octopus Inc. is a leading printing and branding company based in Patna, Bihar. With over a decade of experience, we've been helping businesses of all sizes create impactful brand identities.
                </p>
                <p className="text-background/70">
                  From premium visiting cards to large format banners, UV prints to complete branding solutions — we combine creativity with cutting-edge printing technology to deliver exceptional results.
                </p>
              </div>
              <div className="border-2 border-background shadow-lg overflow-hidden">
                <img
                  src={heroBg}
                  alt="Octopus Inc. Office"
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-primary text-primary-foreground border-2 border-foreground p-8 shadow-md">
                <div className="w-14 h-14 bg-background text-foreground border-2 border-foreground flex items-center justify-center mb-4">
                  <Target className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-primary-foreground/90">
                  To provide high-quality printing and design services that help businesses create lasting impressions. We aim to be the go-to partner for all branding needs, delivering exceptional value through creativity, quality, and customer service.
                </p>
              </div>
              <div className="bg-secondary text-secondary-foreground border-2 border-foreground p-8 shadow-md">
                <div className="w-14 h-14 bg-background text-foreground border-2 border-foreground flex items-center justify-center mb-4">
                  <Eye className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                <p className="text-secondary-foreground/90">
                  To become the most trusted printing and branding company in Eastern India, known for innovation, quality, and customer satisfaction. We envision empowering every business with professional branding that drives success.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 md:py-24 bg-accent">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-background border-2 border-foreground p-6 text-center shadow-sm"
                >
                  <span className="block text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</span>
                  <span className="text-muted-foreground text-sm uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-block bg-primary text-primary-foreground px-4 py-2 text-sm font-bold uppercase tracking-wider mb-4 border-2 border-foreground shadow-sm">
                Our Values
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                What Drives <span className="text-primary">Us</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Our core values guide everything we do, from client interactions to project delivery.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-card border-2 border-foreground p-6 shadow-sm hover:shadow-md hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                >
                  <div className="w-12 h-12 bg-secondary text-secondary-foreground border-2 border-foreground flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-foreground text-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Work <span className="text-secondary">Together?</span>
            </h2>
            <p className="text-xl text-background/80 mb-8 max-w-2xl mx-auto">
              Let's create something amazing for your brand. Get in touch and let's discuss your project.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">
                Contact Us
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
