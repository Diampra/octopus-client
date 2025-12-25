import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Tags,
  LogOut,
  Menu,
  X,
  Image,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const nav = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard },
  { label: "Posts", to: "/admin/posts", icon: FileText },
  { label: "Posts Categories", to: "/admin/categories", icon: Tags },
  { label: "Portfolio", to: "/admin/portfolio", icon: Image },
  { label: "Portfolio Categories", to: "/admin/portfolio/categories", icon: Tags },
  { label: "Services", to: "/admin/services", icon: FileText },
  { label: "Testimonials", to: "/admin/testimonials", icon: FileText },
  
];

export default function AdminLayout() {
  const { pathname } = useLocation();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

const NavLinks = () => (
  <>
    {nav.map(({ label, to, icon: Icon }) => {
      const isActive =
        pathname === to ||
        (pathname.startsWith(to + "/") &&
          !(
            to === "/admin/portfolio" &&
            pathname.startsWith("/admin/portfolio/categories")
          ));

      return (
        <Link
          key={to}
          to={to}
          onClick={() => setIsMenuOpen(false)}
          className={`flex items-center gap-2 px-3 py-2 border-2 border-foreground
            ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent"
            }`}
        >
          <Icon className="w-4 h-4" />
          {label}
        </Link>
      );
    })}
  </>
);


  return (
    <div className="min-h-screen bg-background">
      {/* TOP BAR (mobile) */}
      <header className="md:hidden flex items-center justify-between p-4 border-b-2 border-foreground">
        <h2 className="font-bold text-lg">Admin Panel</h2>

        {/* MENU BUTTON (your exact one) */}
        <button
          className="p-2 border-2 border-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </header>

      <div className="flex">
        {/* SIDEBAR (desktop) */}
        <aside className="hidden md:flex w-64 min-h-screen border-r-2 border-foreground p-4 flex-col">
          <h2 className="font-bold text-xl mb-6">Admin Panel</h2>

          <nav className="space-y-2 flex-1">
            <NavLinks />
          </nav>

          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="mt-6"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </aside>

        {/* MOBILE DRAWER */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setIsMenuOpen(false)}
            />

            <aside className="absolute left-0 top-0 h-full w-64 bg-background border-r-2 border-foreground p-4 flex flex-col">
              <h2 className="font-bold text-xl mb-6">Admin Panel</h2>

              <nav className="space-y-2 flex-1">
                <NavLinks />
              </nav>

              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </aside>
          </div>
        )}

        {/* CONTENT */}
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}