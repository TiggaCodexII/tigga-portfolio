import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
  { id: "home", label: "Home" },
  { id: "capabilities", label: "Services" },
  { id: "work", label: "Projects" },
  { id: "about", label: "About" },
  { id: "skills", label: "Expertise" },
  { id: "experience", label: "Experience" },
  { id: "resume", label: "Résumé" },
  { id: "contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const goToSection = (id: string) => {
    setOpen(false);
    if (id === "resume") {
      navigate("/resume");
      return;
    }
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <button
            onClick={() => goToSection("home")}
            className="flex items-center gap-2 font-display text-lg font-extrabold"
            aria-label="Back to top"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              TC
            </span>
            <span className="gold-text hidden sm:inline">TiggaCodex</span>
          </button>

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => goToSection(link.id)}
                className="rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
              >
                {link.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-primary lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background/95 px-4 pb-4 pt-2 lg:hidden">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => goToSection(link.id)}
              className="block w-full rounded-xl px-4 py-3 text-left text-sm text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
