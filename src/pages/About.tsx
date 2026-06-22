import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { ArrowRight, Target, Eye, Users, Award, Clock, Lightbulb } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import brochures from "@/assets/brochures.jpg";
import banners from "@/assets/banners.jpg";
import SEO from "@/components/SEO";

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

const pillars = [
  {
    id: "mission",
    icon: Target,
    label: "Our Mission",
    headline: "Printing with",
    accent: "purpose",
    body: "To provide high-quality printing and design services that help businesses create lasting impressions. We aim to be the go-to partner for all branding needs, delivering exceptional value through creativity, quality, and customer service.",
    image: heroBg,
  },
  {
    id: "vision",
    icon: Eye,
    label: "Our Vision",
    headline: "Leading the",
    accent: "east",
    body: "To become the most trusted printing and branding company in Eastern India, known for innovation, quality, and customer satisfaction — empowering every business with professional branding that drives success.",
    image: brochures,
  },
  {
    id: "values",
    icon: Lightbulb,
    label: "Our Values",
    headline: "Built on",
    accent: "principles",
    body: "Quality, creativity, transparency and timeliness — these aren't buzzwords. They're the commitments every member of our team makes to every client, every single day.",
    image: banners,
  },
];

const About = () => {
  const [activePillar, setActivePillar] = useState(0);
  const current = pillars[activePillar];
  const CurrentIcon = current.icon;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="About Us - Octopus"
        description="Octopus Inc. is a leading printing and branding company based in Patna, Bihar. Your creative partner."
        url="https://octopus.in/about"
      />
      <Header />

      <main className="pt-16 md:pt-20">

        {/* ── HERO ── */}
        <section className="bg-foreground text-background relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[80vh]">

            {/* Left — text */}
            <div className="lg:col-span-6 flex flex-col justify-center px-6 xl:px-20 py-24 relative overflow-hidden">
              {/* Ghost word */}
              <div className="absolute inset-0 flex items-center pointer-events-none select-none overflow-hidden">
                <span className="text-[14vw] font-black uppercase tracking-tighter leading-none text-background/[0.03] whitespace-nowrap">
                  STORY
                </span>
              </div>

              <div className="relative z-10">
                <span className="inline-block bg-primary text-primary-foreground px-4 py-2 text-xs font-bold uppercase tracking-wider mb-8 border-2 border-background">
                  [ About / Octopus Inc. ]
                </span>
                <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-bold uppercase tracking-tighter leading-[0.9] mb-8">
                  Your Creative <br />
                  <span className="font-serif italic lowercase font-normal text-primary">partner</span>
                </h1>
                <p className="text-xl text-background/75 leading-relaxed mb-6 max-w-md font-medium">
                  Octopus Inc. is a leading printing and branding company based in Patna, Bihar. With over a decade of experience, we've been helping businesses of all sizes create impactful brand identities.
                </p>
                <p className="text-base text-background/55 leading-relaxed max-w-md mb-10">
                  From premium visiting cards to large format banners, UV prints to complete branding solutions — we combine creativity with cutting-edge technology.
                </p>

                {/* Stats row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-background/10 pt-10">
                  {stats.map((stat, i) => (
                    <div key={i}>
                      <span className="block text-3xl font-light tracking-tighter text-primary leading-none mb-1">
                        {stat.value}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-background/40">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — image split */}
            <div className="lg:col-span-6 relative overflow-hidden">
              <div className="h-[50vh] lg:h-full relative group">
                <img
                  src={heroBg}
                  alt="Octopus Inc. office"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-foreground/25" />
                {/* Floating tag */}
                <div className="absolute bottom-8 left-8 bg-foreground/80 backdrop-blur-sm px-4 py-3 border border-background/20">
                  <p className="font-mono text-[9px] uppercase tracking-widest text-background/50 mb-1">Est.</p>
                  <p className="text-background font-bold text-lg tracking-tight">2014 · Patna, Bihar</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── MISSION / VISION / VALUES — sticky left + scroll right ── */}
        <section className="bg-background relative">
          <div className="grid grid-cols-1 lg:grid-cols-12">

            {/* Sticky Left — active pillar detail */}
            <div className="lg:col-span-5 relative border-r border-border">
              <div className="sticky top-16 h-auto lg:h-[calc(100vh-4rem)] flex flex-col justify-center px-6 xl:px-14 py-16 lg:py-24 overflow-hidden">

                {/* Ghost word */}
                <div className="absolute inset-0 flex items-center pointer-events-none select-none overflow-hidden">
                  <span className="text-[11vw] font-black uppercase tracking-tighter leading-none text-foreground/[0.025] whitespace-nowrap">
                    {current.id.toUpperCase()}
                  </span>
                </div>

                <div className="relative z-10">
                  <span className="inline-block bg-foreground text-background px-4 py-2 text-xs font-bold uppercase tracking-wider mb-6 border-2 border-foreground">
                    [ About / Our Story ]
                  </span>

                  {/* Image */}
                  <div key={current.id} className="aspect-[4/3] overflow-hidden mb-8 relative group animate-fade-in">
                    <img
                      src={current.image}
                      alt={current.label}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-foreground/15" />
                    <div className="absolute top-4 left-4">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-background/70 bg-foreground/50 px-2 py-0.5 backdrop-blur-sm">
                        {current.label}
                      </span>
                    </div>
                  </div>

                  <div key={`text-${current.id}`} className="animate-fade-in">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 border-2 border-foreground flex items-center justify-center bg-muted">
                        <CurrentIcon className="w-4 h-4" />
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        {String(activePillar + 1).padStart(2, "0")} / {String(pillars.length).padStart(2, "0")}
                      </span>
                    </div>

                    <h2 className="text-3xl font-bold tracking-tight mb-2 uppercase leading-none">
                      {current.headline} <br />
                      <span className="font-serif italic lowercase font-normal text-primary">{current.accent}</span>
                    </h2>

                    <div className="w-8 h-px bg-foreground/20 my-5" />

                    <p className="text-muted-foreground leading-relaxed text-base mb-8">
                      {current.body}
                    </p>

                    {/* Dot indicators */}
                    <div className="flex gap-2">
                      {pillars.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActivePillar(i)}
                          className={`transition-all duration-300 rounded-full ${i === activePillar
                              ? "w-6 h-2 bg-primary"
                              : "w-2 h-2 bg-foreground/20 hover:bg-foreground/50"
                            }`}
                          aria-label={`View ${pillars[i].label}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Scrollable Right — pillar rows */}
            <div className="lg:col-span-7">
              {pillars.map((pillar, i) => {
                const Icon = pillar.icon;
                const isActive = i === activePillar;
                return (
                  <div
                    key={pillar.id}
                    onClick={() => setActivePillar(i)}
                    className={`group cursor-pointer border-b border-border transition-colors duration-300 ${isActive ? "bg-foreground text-background" : "hover:bg-muted/30"
                      }`}
                  >
                    <div className="flex items-stretch">
                      {/* Image thumbnail */}
                      <div className="w-32 md:w-48 shrink-0 overflow-hidden relative">
                        <img
                          src={pillar.image}
                          alt={pillar.label}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                        />
                        <div className={`absolute inset-0 transition-colors ${isActive ? "bg-foreground/30" : "bg-foreground/10"}`} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 px-6 md:px-10 py-10 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-9 h-9 border flex items-center justify-center transition-colors ${isActive ? "border-background/40 text-background" : "border-foreground/20"
                            }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className={`font-mono text-[10px] uppercase tracking-widest ${isActive ? "text-background/50" : "text-muted-foreground"
                            }`}>
                            0{i + 1}
                          </span>
                        </div>

                        <h3 className="text-2xl font-bold tracking-tight uppercase leading-none mb-3">
                          {pillar.label}
                        </h3>
                        <p className={`text-sm leading-relaxed line-clamp-2 ${isActive ? "text-background/70" : "text-muted-foreground"
                          }`}>
                          {pillar.body}
                        </p>
                      </div>

                      {/* Active indicator */}
                      <div className={`w-1 transition-colors ${isActive ? "bg-primary" : "bg-transparent"}`} />
                    </div>
                  </div>
                );
              })}

              {/* Values grid — below the rows */}
              <div className="border-t border-border">
                <div className="px-6 md:px-10 py-10">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-8">
                    Core Values
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {values.map((value, i) => {
                      const Icon = value.icon;
                      return (
                        <div key={i} className="group flex gap-4 items-start p-5 border border-border hover:border-foreground/30 hover:bg-muted/30 transition-all duration-300">
                          <div className="w-9 h-9 border-2 border-foreground/20 flex items-center justify-center shrink-0 group-hover:border-foreground group-hover:bg-foreground group-hover:text-background transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm uppercase tracking-tight mb-1">{value.title}</h4>
                            <p className="text-muted-foreground text-xs leading-relaxed">{value.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── BOTTOM CTA ── */}
        <section className="py-24 bg-foreground text-background relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <span className="text-[18vw] font-black uppercase tracking-tighter leading-none text-background/[0.03] whitespace-nowrap">
              TOGETHER
            </span>
          </div>
          <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-none mb-4">
                Ready to Work <span className="text-primary italic font-serif lowercase">together?</span>
              </h2>
              <p className="text-background/70 text-lg max-w-md font-medium">
                Let's create something amazing for your brand. Get in touch and let's discuss your project.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-background text-foreground px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-background/90 transition-colors shrink-0 group"
            >
              Contact Us
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>

      </main>

      <Footer />

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.4s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>
    </div>
  );
};

export default About;
