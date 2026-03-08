import { motion } from "framer-motion";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProjectGrid from "@/components/ProjectGrid";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Agência Lápis Criativo, transformamos sua ideia em realidade</title>
        <meta
          name="description"
          content="Desenvolvemos sites, landing pages, CRMs e Micro-SaaS com design premium e tecnologia de ponta. Transformamos ideias em negócios digitais de sucesso."
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <ProjectGrid />

          {/* About Section */}
          <section id="sobre" className="py-20 bg-card/30">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto text-center"
              >
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
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="glass-card p-8"
                    >
                      <motion.div
                        className="text-4xl mb-4"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {item.icon}
                      </motion.div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-3">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        </main>
        <Footer />
        <WhatsAppButton phoneNumber="5521965982906" />
      </div>
    </>
  );
};

export default Index;
