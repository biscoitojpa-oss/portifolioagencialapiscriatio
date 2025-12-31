import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProjectGrid from "@/components/ProjectGrid";
import Footer from "@/components/Footer";
import { mockProjects } from "@/data/mockProjects";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Lápis Criativo - Agência de Design & Desenvolvimento Digital</title>
        <meta
          name="description"
          content="Desenvolvemos sites, landing pages, CRMs e Micro-SaaS com design premium e tecnologia de ponta. Transformamos ideias em negócios digitais de sucesso."
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <ProjectGrid projects={mockProjects} />
          
          {/* About Section */}
          <section id="sobre" className="py-20 bg-card/30">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Por que a <span className="gradient-text">Lápis Criativo</span>?
                </h2>
                <p className="text-lg text-muted-foreground mb-12">
                  Somos especialistas em criar soluções digitais que combinam design
                  impactante com tecnologia de ponta. Cada projeto é único e
                  desenvolvido com foco total em resultados.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      title: "Design Premium",
                      description: "Interfaces modernas e elegantes que encantam e convertem.",
                      icon: "🎨",
                    },
                    {
                      title: "Tecnologia Avançada",
                      description: "Desenvolvemos com as melhores ferramentas do mercado.",
                      icon: "⚡",
                    },
                    {
                      title: "Resultados Reais",
                      description: "Foco em métricas e crescimento do seu negócio.",
                      icon: "📈",
                    },
                  ].map((item, index) => (
                    <div key={index} className="glass-card p-8 hover-lift">
                      <div className="text-4xl mb-4">{item.icon}</div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-3">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
