import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useProject } from "@/hooks/useProjects";
import { ArrowLeft, ExternalLink, Calendar, Tag, Loader2 } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { categoryLabels } from "@/types/project";

const Project = () => {
  const { id } = useParams();
  const { data: project, isLoading, error } = useProject(id || "");

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

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Project Image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="glass-card overflow-hidden"
              >
                <div className="relative aspect-video">
                  <motion.img
                    src={project.thumbnail_url || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  />
                  {project.featured && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="absolute top-4 left-4"
                    >
                      <Badge className="bg-gradient-primary text-primary-foreground border-0 shadow-glow">
                        ⭐ Projeto Destaque
                      </Badge>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Project Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
                    <Tag className="w-3 h-3 mr-1" />
                    {categoryLabels[project.category]}
                  </Badge>
                  <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                    {project.title}
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    {project.description}
                  </p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="glass-card p-6 space-y-4"
                >
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    Sobre o Projeto
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.full_description || project.description}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="glass-card p-6"
                >
                  <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                    Detalhes
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
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
                    <div className="flex items-center gap-3">
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
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  {project.external_link && (
                    <motion.a
                      href={project.external_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button variant="neon" size="xl" className="w-full">
                        <ExternalLink className="w-5 h-5" />
                        Abrir Projeto
                      </Button>
                    </motion.a>
                  )}
                  <motion.div
                    className="flex-1"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link to="/" className="block">
                      <Button variant="glass" size="xl" className="w-full">
                        Ver Outros Projetos
                      </Button>
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Project;
