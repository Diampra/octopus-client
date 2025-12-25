import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background border-t-4 border-primary">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
          <Link to="/" className="flex items-center gap-2">
            {/* <div className="w-10 h-10 bg-primary border-2 border-foreground flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">O</span>
            </div> */}
            {/* <span className="font-bold text-xl tracking-tight">Octopus Inc.</span> */}
            <img src="/logo-transparent.png" alt="Octopus Inc." className="h-14 md:h-20" />
            {/* <AnimatedOctopusLines /> */}
            {/* <AnimatedOctopusLogo /> */}
          </Link>
            </div>
            <p className="text-background/80 mb-4">
              Creative printing & branding solutions for businesses of all sizes. From visiting cards to large format prints.
            </p>
            <div className="flex gap-2">
              <a href="#" className="w-10 h-10 bg-background/10 border-2 border-background/30 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-background/10 border-2 border-background/30 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-background/10 border-2 border-background/30 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-background/10 border-2 border-background/30 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg uppercase tracking-wider mb-4 border-b-2 border-primary pb-2 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-background/80 hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/services" className="text-background/80 hover:text-primary transition-colors">Services</Link></li>
              <li><Link to="/portfolio" className="text-background/80 hover:text-primary transition-colors">Portfolio</Link></li>
              <li><Link to="/blog" className="text-background/80 hover:text-primary transition-colors">Blog</Link></li>
              <li><Link to="/about" className="text-background/80 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-background/80 hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg uppercase tracking-wider mb-4 border-b-2 border-primary pb-2 inline-block">
              Services
            </h3>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-background/80 hover:text-primary transition-colors">Visiting Cards</Link></li>
              <li><Link to="/services" className="text-background/80 hover:text-primary transition-colors">Brochures & Catalogues</Link></li>
              <li><Link to="/services" className="text-background/80 hover:text-primary transition-colors">Banners & Flex</Link></li>
              <li><Link to="/services" className="text-background/80 hover:text-primary transition-colors">UV & Acrylic Prints</Link></li>
              <li><Link to="/services" className="text-background/80 hover:text-primary transition-colors">Logo Design</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg uppercase tracking-wider mb-4 border-b-2 border-primary pb-2 inline-block">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-background/80">Patna, Bihar, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:+919876543210" className="text-background/80 hover:text-primary transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="mailto:info@octopusinc.in" className="text-background/80 hover:text-primary transition-colors">info@octopusinc.in</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t-2 border-background/20 mt-12 pt-8 text-center">
          <p className="text-background/60">
            © {new Date().getFullYear()} Octopus Inc. All rights reserved. | Printing & Branding Excellence
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
