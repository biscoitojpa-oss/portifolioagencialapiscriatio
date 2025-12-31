import { Pencil } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/30 backdrop-blur-xl">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Pencil className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg text-foreground">
                Lápis Criativo
              </span>
              <span className="text-xs text-muted-foreground -mt-1">
                Agência Digital
              </span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground text-center">
            Transformando ideias em negócios digitais de sucesso.
          </p>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Lápis Criativo. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
