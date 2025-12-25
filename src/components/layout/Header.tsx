import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Blog", path: "/blog" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b-2 border-foreground">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            {/* <div className="w-10 h-10 bg-primary border-2 border-foreground flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">O</span>
            </div> */}
            {/* <span className="font-bold text-xl tracking-tight">Octopus Inc.</span> */}
            <img src="/logo-transparent.png" alt="Octopus Inc." className="h-14 md:h-20" />
            {/* <AnimatedOctopusLines /> */}
            {/* <AnimatedOctopusLogo /> */}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 font-medium uppercase text-sm tracking-wider transition-colors hover:bg-accent ${
                  location.pathname === link.path ? "bg-primary text-primary-foreground" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button variant="secondary" size="lg" asChild>
              <Link to="/contact" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Get Quote
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 border-2 border-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b-2 border-foreground">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-3 font-medium uppercase text-sm tracking-wider border-2 border-foreground ${
                  location.pathname === link.path ? "bg-primary text-primary-foreground" : "bg-background"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Button variant="secondary" size="lg" className="mt-2" asChild>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                <Phone className="w-4 h-4" />
                Get Quote
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
