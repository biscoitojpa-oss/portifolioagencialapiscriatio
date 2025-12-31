import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Header = () => {
  const location = useLocation();

  const scrollToSection = (sectionId: string) => {
    // If we're not on the home page, navigate first
    if (location.pathname !== "/") {
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    if (location.pathname !== "/") {
      window.location.href = "/";
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img 
            src={logo} 
            alt="Lápis Criativo" 
            className="h-12 w-auto object-contain"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={scrollToTop}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Portfólio
          </button>
          <button
            onClick={() => scrollToSection("categorias")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Categorias
          </button>
          <button
            onClick={() => scrollToSection("sobre")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Sobre
          </button>
        </nav>

        <Link to="/admin">
          <Button variant="glass" size="sm">
            Área Admin
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
