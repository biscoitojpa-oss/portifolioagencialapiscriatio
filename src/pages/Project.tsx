import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useProject } from "@/hooks/useProjects";
import { 
  ArrowLeft, 
  ExternalLink, 
  Calendar, 
  Tag, 
  Loader2, 
  ZoomIn, 
  X,
  MessageCircle,
  CheckCircle2
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { categoryLabels } from "@/types/project";

const Project = () => {
  const { id } = useParams();
  const { data: project, isLoading, error } = useProject(id || "");
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">
            Projeto não encontrado
          </h1>
          <Link to="/">
            <Button variant="neon">Voltar ao Portfólio</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  // Parse full description into paragraphs
  const descriptionParagraphs = project.full_description 
    ? project.full_description.split('\n').filter(p => p.trim())
    : [project.description];

  return (
    <>
      <Helmet>
        <title>{project.title} - Lápis Criativo</title>
        <meta name="description" content={project.description} />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-28 pb-20">
          <div className="container mx-auto px-6">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar ao Portfólio
              </Link>
            </motion.div>

            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-12"
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge className="bg-primary/20 text-primary border-primary/30">
                  <Tag className="w-3 h-3 mr-1" />
                  {categoryLabels[project.category]}
                </Badge>
                {project.featured && (
                  <Badge className="bg-gradient-primary text-primary-foreground border-0 shadow-glow">
                    ⭐ Destaque
                  </Badge>
                )}
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                {project.title}
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl">
                {project.description}
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Project Image Gallery */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="glass-card overflow-hidden group cursor-pointer"
                  onClick={() => setLightboxOpen(true)}
                >
                  <div className="relative aspect-video">
                    <motion.img
                      src={project.thumbnail_url || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-background/60 flex items-center justify-center"
                    >
                      <div className="flex items-center gap-2 text-foreground">
                        <ZoomIn className="w-6 h-6" />
                        <span className="font-medium">Ver em tamanho maior</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Full Description */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="glass-card p-8"
                >
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                    Sobre o Projeto
                  </h2>
                  <div className="space-y-4">
                    {descriptionParagraphs.map((paragraph, index) => (
                      <motion.p
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                        className="text-muted-foreground leading-relaxed"
                      >
                        {paragraph}
                      </motion.p>
                    ))}
                  </div>
                </motion.div>

                {/* Features/Highlights */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="glass-card p-8"
                >
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                    Destaques
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      "Design responsivo e moderno",
                      "Interface intuitiva",
                      "Performance otimizada",
                      "SEO estruturado",
                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-foreground">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Project Details */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="glass-card p-6 sticky top-28"
                >
                  <h3 className="font-display text-lg font-semibold text-foreground mb-6">
                    Informações
                  </h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Tag className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Categoria</p>
                        <p className="text-sm font-medium text-foreground">
                          {categoryLabels[project.category]}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Status</p>
                        <p className="text-sm font-medium text-foreground">
                          {project.status === "active" ? "Ativo" : "Oculto"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {project.external_link && (
                      <motion.a
                        href={project.external_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button variant="neon" size="lg" className="w-full">
                          <ExternalLink className="w-5 h-5" />
                          Acessar Projeto
                        </Button>
                      </motion.a>
                    )}
                    
                    <motion.a
                      href="https://wa.me/5521991796781?text=Olá! Vi o projeto no portfólio e gostaria de saber mais."
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button variant="glass" size="lg" className="w-full">
                        <MessageCircle className="w-5 h-5" />
                        Falar sobre este projeto
                      </Button>
                    </motion.a>
                    
                    <Link to="/">
                      <Button variant="outline" size="lg" className="w-full">
                        <ArrowLeft className="w-5 h-5" />
                        Ver outros projetos
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
        <WhatsAppButton phoneNumber="5521991796781" />

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center p-6"
              onClick={() => setLightboxOpen(false)}
            >
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute top-6 right-6 p-2 rounded-full bg-accent hover:bg-accent/80 transition-colors"
                onClick={() => setLightboxOpen(false)}
              >
                <X className="w-6 h-6" />
              </motion.button>
              <motion.img
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                src={project.thumbnail_url || "/placeholder.svg"}
                alt={project.title}
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Project;
