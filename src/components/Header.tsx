import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Header = () => {
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
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Portfólio
          </Link>
          <Link
            to="/#categorias"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Categorias
          </Link>
          <Link
            to="/#sobre"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Sobre
          </Link>
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
