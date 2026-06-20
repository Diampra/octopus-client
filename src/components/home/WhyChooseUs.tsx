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
    <section className="py-24 bg-foreground text-background relative overflow-hidden z-0">
      {/* Massive Background Typography */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full text-center pointer-events-none select-none opacity-[0.03]">
        <span className="text-[25vw] font-black uppercase tracking-tighter leading-none text-background">
          ADVANTAGE
        </span>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          
          {/* Header Column */}
          <div className="lg:col-span-5 sticky top-24">
            <span className="inline-block text-secondary font-mono text-sm uppercase tracking-widest mb-4">
              [ 02 / Why Us ]
            </span>
            <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-[0.9] mb-8">
              The Octopus <br />
              <span className="text-secondary italic font-serif lowercase">advantage</span>
            </h2>
            <p className="text-xl text-background/80 leading-relaxed font-medium">
              We're not just printers — we're your creative partners in building a memorable brand. Here's why top agencies and businesses choose us.
            </p>
          </div>

          {/* Features Editorial List */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className={`relative group ${index % 2 === 1 ? 'sm:mt-24' : ''}`}
                >
                  {/* Large Background Number */}
                  <div className="absolute -top-10 -left-6 text-8xl font-black text-background/5 transition-colors group-hover:text-secondary/10 -z-10 select-none">
                    0{index + 1}
                  </div>
                  
                  <div className="border-t-4 border-secondary pt-6">
                    <div className="w-12 h-12 bg-background text-foreground flex items-center justify-center mb-6">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-background/70 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
