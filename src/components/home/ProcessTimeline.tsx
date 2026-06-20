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
    <section className="py-32 bg-foreground text-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-24">
          <span className="inline-block text-secondary font-mono text-sm uppercase tracking-widest mb-4">
            Methodology
          </span>
          <h2 className="text-5xl md:text-7xl font-light tracking-tighter leading-none mb-6">
            How We <span className="font-bold">Work</span>
          </h2>
          <p className="text-background/80 text-lg max-w-2xl mx-auto font-medium">
            A seamless, transparent process from initial concept to final delivery.
          </p>
        </div>

        {/* Alternating Zigzag Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Center vertical line — desktop only */}
          <div className="hidden md:block absolute inset-y-0 left-1/2 w-px bg-background/20 -translate-x-1/2 z-0" />
          {/* Left edge line — mobile only */}
          <div className="md:hidden absolute inset-y-0 left-5 w-px bg-background/20 z-0" />

          <div className="flex flex-col divide-y divide-background/10">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              const Icon = step.icon;

              return (
                <div
                  key={index}
                  className="relative flex items-stretch min-h-[180px] group"
                >
                  {/* ── LEFT HALF ── */}
                  <div className="hidden md:flex flex-1 items-center justify-end pr-16 py-10">
                    {isEven ? (
                      /* Content on LEFT for even (01, 03) */
                      <div className="max-w-[280px] text-right">
                        <div className="flex items-center justify-end gap-3 mb-3">
                          <h3 className="text-2xl font-bold tracking-tight leading-tight">
                            {step.title}
                          </h3>
                          <div className="w-9 h-9 border border-background/30 group-hover:border-secondary flex items-center justify-center transition-colors shrink-0">
                            <Icon className="w-4 h-4 group-hover:text-secondary transition-colors" />
                          </div>
                        </div>
                        <p className="text-background/70 leading-relaxed text-[15px]">
                          {step.description}
                        </p>
                      </div>
                    ) : (
                      /* Big ghost number on LEFT for odd (02, 04) */
                      <span className="text-[9rem] font-black leading-none text-background/[0.04] group-hover:text-background/[0.07] transition-colors select-none">
                        0{index + 1}
                      </span>
                    )}
                  </div>

                  {/* ── CENTER NODE ── */}
                  <div className="relative z-10 flex flex-col items-center justify-center w-10 shrink-0 md:w-0">
                    {/* Mobile dot */}
                    <div className="md:hidden absolute left-5 w-5 h-5 rounded-full bg-secondary border-[3px] border-foreground group-hover:scale-125 transition-transform duration-300 -translate-x-1/2" />
                    {/* Desktop dot */}
                    <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-secondary border-[3px] border-foreground group-hover:scale-125 transition-transform duration-300 shadow-[0_0_0_6px_rgba(255,255,255,0.04)]" />
                  </div>

                  {/* ── RIGHT HALF ── */}
                  <div className="flex-1 flex items-center justify-start pl-14 md:pl-16 py-10">
                    {!isEven ? (
                      /* Content on RIGHT for odd (02, 04) */
                      <div className="max-w-[280px] text-left">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-9 h-9 border border-background/30 group-hover:border-secondary flex items-center justify-center transition-colors shrink-0">
                            <Icon className="w-4 h-4 group-hover:text-secondary transition-colors" />
                          </div>
                          <h3 className="text-2xl font-bold tracking-tight leading-tight">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-background/70 leading-relaxed text-[15px]">
                          {step.description}
                        </p>
                      </div>
                    ) : (
                      /* Big ghost number on RIGHT for even (01, 03) — desktop only */
                      <span className="hidden md:inline text-[9rem] font-black leading-none text-background/[0.04] group-hover:text-background/[0.07] transition-colors select-none">
                        0{index + 1}
                      </span>
                    )}

                    {/* Mobile: always show content */}
                    {isEven && (
                      <div className="md:hidden max-w-[280px] text-left">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-9 h-9 border border-background/30 group-hover:border-secondary flex items-center justify-center transition-colors shrink-0">
                            <Icon className="w-4 h-4 group-hover:text-secondary transition-colors" />
                          </div>
                          <h3 className="text-2xl font-bold tracking-tight leading-tight">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-background/70 leading-relaxed text-[15px]">
                          {step.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProcessTimeline;
