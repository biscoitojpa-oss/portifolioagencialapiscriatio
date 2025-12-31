import { useState } from "react";
import ProjectCard, { Project } from "./ProjectCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProjectGridProps {
  projects: Project[];
}

const categories = [
  { id: "all", label: "Todos" },
  { id: "sites", label: "Sites" },
  { id: "landing-pages", label: "Landing Pages" },
  { id: "crms", label: "CRMs" },
  { id: "micro-saas", label: "Micro-SaaS" },
] as const;

const ProjectGrid = ({ projects }: ProjectGridProps) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredProjects = projects.filter(
    (project) =>
      project.status === "active" &&
      (activeCategory === "all" || project.category === activeCategory)
  );

  return (
    <section id="categorias" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nossos <span className="gradient-text">Projetos</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore nossa galeria de projetos desenvolvidos com excelência e
            criatividade para diversos segmentos do mercado.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
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
          ))}
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`animate-fade-in-delay-${Math.min(index % 3 + 1, 3)}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              Nenhum projeto encontrado nesta categoria.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectGrid;
