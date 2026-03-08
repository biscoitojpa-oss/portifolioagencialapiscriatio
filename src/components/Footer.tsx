import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/30 backdrop-blur-xl">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <img 
            src={logo} 
            alt="Lápis Criativo" 
            className="h-20 w-auto object-contain"
          />

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
