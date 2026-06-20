import { Link } from "react-router-dom";
import { ArrowUpRight, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background pt-20 border-t border-border overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-20">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <Link to="/" className="inline-block mb-6">
                <img src="/logo-transparent.png" alt="Octopus Inc." className="h-12 object-contain" />
              </Link>
              <p className="text-background/70 text-sm leading-relaxed max-w-sm mb-8">
                Creative printing & branding solutions for businesses of all sizes. We combine precision technology with striking aesthetics.
              </p>
            </div>
            
            {/* Socials */}
            <div className="flex gap-2">
              {[
                { icon: Facebook, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Twitter, href: "#" }
              ].map((social, i) => {
                const Icon = social.icon;
                return (
                  <a 
                    key={i} 
                    href={social.href} 
                    className="w-10 h-10 border border-background/20 flex items-center justify-center hover:bg-background hover:text-foreground transition-colors group"
                    aria-label="Social link"
                  >
                    <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8 lg:pl-12">
            
            {/* Nav */}
            <div>
              <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-background/50 mb-6">
                Navigation
              </h3>
              <ul className="space-y-4">
                {["Home", "Services", "Portfolio", "Blog", "About"].map((item) => (
                  <li key={item}>
                    <Link to={item === "Home" ? "/" : `/${item.toLowerCase()}`} className="text-sm font-bold uppercase tracking-wider hover:text-primary transition-colors flex items-center gap-1 group w-fit">
                      {item}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-background/50 mb-6">
                Services
              </h3>
              <ul className="space-y-4">
                {[
                  "Visiting Cards", 
                  "Brochures", 
                  "Banners & Flex", 
                  "UV & Acrylic", 
                  "Packaging"
                ].map((item) => (
                  <li key={item}>
                    <Link to="/services" className="text-sm font-medium text-background/70 hover:text-background transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="col-span-2 md:col-span-1">
              <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-background/50 mb-6">
                Contact
              </h3>
              <ul className="space-y-6">
                <li>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-background/40 mb-1">Email</p>
                  <a href="mailto:info@octopusinc.in" className="text-sm font-bold uppercase hover:text-primary transition-colors inline-block border-b border-background/20 pb-0.5">
                    info@octopusinc.in
                  </a>
                </li>
                <li>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-background/40 mb-1">Call</p>
                  <a href="tel:+918092207196" className="text-sm font-bold uppercase hover:text-primary transition-colors">
                    +91 80922 07196
                  </a>
                </li>
                <li>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-background/40 mb-1">Visit</p>
                  <p className="text-sm text-background/70 leading-relaxed">
                    B61, 1st Flr, Mauryalok <br />
                    Shopping Complex, Budh Marg, <br />
                    Patna. (Bihar) India.
                  </p>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Massive brutalist footer logo */}
      <div className="w-full overflow-hidden border-y border-background/10 bg-background/5 py-8 md:py-12 flex items-center justify-center">
        <img 
          src="/logo-transparent.png" 
          alt="Octopus Inc." 
          className="w-[80vw] max-w-6xl h-auto opacity-20 select-none pointer-events-none grayscale" 
        />
      </div>

      {/* Bottom Bar */}
      <div className="container mx-auto px-4 md:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-background/40">
            © {new Date().getFullYear()} Octopus Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="font-mono text-[10px] uppercase tracking-widest text-background/40 hover:text-background transition-colors">
              Privacy
            </Link>
            <Link to="/terms-of-service" className="font-mono text-[10px] uppercase tracking-widest text-background/40 hover:text-background transition-colors">
              Terms
            </Link>
            <Link to="/dmca" className="font-mono text-[10px] uppercase tracking-widest text-background/40 hover:text-background transition-colors">
              DMCA
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
