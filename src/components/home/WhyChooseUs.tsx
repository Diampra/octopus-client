import { Clock, Award, IndianRupee, Brush } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Fast Turnaround",
    description: "Quick delivery without compromising on quality. We understand your deadlines.",
  },
  {
    icon: Brush,
    title: "Custom Designs",
    description: "Unique creative solutions tailored to your brand identity and vision.",
  },
  {
    icon: IndianRupee,
    title: "Competitive Pricing",
    description: "Premium quality at affordable rates. Best value for your investment.",
  },
  {
    icon: Award,
    title: "Quality Materials",
    description: "We use only the finest papers, inks, and printing technology.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 md:py-24 bg-accent">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block bg-secondary text-secondary-foreground px-4 py-2 text-sm font-bold uppercase tracking-wider mb-4 border-2 border-foreground shadow-sm">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            The Octopus <span className="text-secondary">Advantage</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We're not just printers — we're your creative partners in building a memorable brand.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-background border-2 border-foreground p-6 text-center shadow-sm hover:shadow-md hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
            >
              <div className="w-16 h-16 bg-secondary text-secondary-foreground border-2 border-foreground flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
