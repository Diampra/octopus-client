import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navLinks = [
  { name: "Services", path: "/services" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Blog", path: "/blog" },
  { name: "About", path: "/about" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background backdrop-blur-md border-b border-border shadow-sm" : "bg-background border-b border-transparent"
      }`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 relative z-50">
            <img src="/logo-transparent.png" alt="Octopus Inc." className="h-10 md:h-16 object-contain" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors ${isActive ? "text-primary" : "text-foreground hover:text-primary"
                    }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-primary animate-fade-in" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right — CTA */}
          <div className="hidden md:flex items-center gap-4 relative z-50">
            <Link
              to="/contact"
              className="flex items-center gap-2 border border-border px-5 py-2 text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-foreground hover:text-background hover:border-foreground transition-all group"
            >
              Get Quote
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden relative z-50 p-2 -mr-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden fixed inset-0 z-40 transition-transform duration-500 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
        <div className="flex flex-col h-full pt-24 px-6 pb-12 bg-white">
          <nav className="flex flex-col gap-6 flex-1 bg-white">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className={`text-3xl font-bold uppercase tracking-tighter ${location.pathname === '/' ? "text-primary" : "text-foreground"}`}
            >
              Home
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`text-3xl font-bold uppercase tracking-tighter ${location.pathname === link.path ? "text-primary" : "text-foreground"}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="border-t border-border pt-8 mt-auto">
            <Link
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between w-full bg-foreground text-background p-4 font-mono text-xs font-bold uppercase tracking-widest"
            >
              Get a Quote
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
