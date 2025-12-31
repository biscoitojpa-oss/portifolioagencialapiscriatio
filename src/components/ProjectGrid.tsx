import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useProjects } from "@/hooks/useProjects";
import { Loader2 } from "lucide-react";

const categories = [
  { id: "all", label: "Todos" },
  { id: "sites", label: "Sites" },
  { id: "landing-pages", label: "Landing Pages" },
  { id: "crms", label: "CRMs" },
  { id: "micro-saas", label: "Micro-SaaS" },
] as const;

const ProjectGrid = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const { data: projects, isLoading, error } = useProjects(false);

  const filteredProjects = projects?.filter(
    (project) =>
      activeCategory === "all" || project.category === activeCategory
  ) || [];

  if (isLoading) {
    return (
      <section id="categorias" className="py-20">
        <div className="container mx-auto px-6 flex justify-center items-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="categorias" className="py-20">
        <div className="container mx-auto px-6 text-center">
          <p className="text-destructive">Erro ao carregar projetos.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="categorias" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nossos <span className="gradient-text">Projetos</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore nossa galeria de projetos desenvolvidos com excelência e
            criatividade para diversos segmentos do mercado.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={activeCategory === category.id ? "neon" : "glass"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "transition-all duration-300",
                  activeCategory === category.id && "shadow-glow"
                )}
              >
                {category.label}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-muted-foreground text-lg">
                Nenhum projeto encontrado nesta categoria.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectGrid;
