import { MessageSquare, PenTool, Printer, Truck } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Discovery",
    description: "We understand your brand, goals, and requirements through an initial consultation.",
  },
  {
    icon: PenTool,
    title: "Design & Proof",
    description: "Our creative team develops concepts. We iterate until you approve the final proof.",
  },
  {
    icon: Printer,
    title: "Production",
    description: "We bring your design to life using premium materials and state-of-the-art printing.",
  },
  {
    icon: Truck,
    title: "Delivery",
    description: "Quality-checked and delivered safely to your doorstep, right on schedule.",
  },
];

const ProcessTimeline = () => {
  return (
    <section className="py-24 bg-accent border-y-2 border-foreground relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block text-primary font-mono text-sm uppercase tracking-widest mb-4">
            [ 04 / Methodology ]
          </span>
          <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-none mb-6">
            How We <span className="text-primary italic font-serif lowercase">work</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A seamless, transparent process from initial concept to final delivery.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-1 bg-foreground" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 relative">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Connecting Line (Mobile/Tablet) */}
                {index !== steps.length - 1 && (
                  <div className="lg:hidden absolute top-12 left-[3.25rem] w-1 h-full bg-foreground -z-10" />
                )}

                <div className="flex flex-row lg:flex-col gap-6 items-start lg:items-center text-left lg:text-center">
                  
                  {/* Icon / Node */}
                  <div className="w-24 h-24 shrink-0 bg-background border-4 border-foreground flex items-center justify-center text-foreground group-hover:bg-secondary group-hover:text-secondary-foreground group-hover:-translate-y-2 transition-all shadow-sm z-10 relative">
                    <step.icon className="w-10 h-10" />
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary text-primary-foreground border-2 border-foreground font-mono text-sm font-bold flex items-center justify-center">
                      {index + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProcessTimeline;
