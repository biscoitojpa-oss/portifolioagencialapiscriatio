import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow group-hover:shadow-neon transition-shadow duration-300">
            <Pencil className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg text-foreground">
              Lápis Criativo
            </span>
            <span className="text-xs text-muted-foreground -mt-1">Agência Digital</span>
          </div>
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
