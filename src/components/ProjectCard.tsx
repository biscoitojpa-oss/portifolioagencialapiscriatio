import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Eye } from "lucide-react";
import { Project, categoryLabels, categoryColors } from "@/types/project";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const ProjectCard = ({ project, index = 0 }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ y: -8 }}
      className="glass-card group overflow-hidden"
    >
      <div className="relative aspect-video overflow-hidden">
        <motion.img
          src={project.thumbnail_url || "/placeholder.svg"}
          alt={project.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        {project.featured && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute top-3 left-3"
          >
            <Badge className="bg-gradient-primary text-primary-foreground border-0 shadow-glow">
              ⭐ Destaque
            </Badge>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="absolute top-3 right-3"
        >
          <Badge className={`border ${categoryColors[project.category]}`}>
            {categoryLabels[project.category]}
          </Badge>
        </motion.div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Link to={`/projeto/${project.id}`}>
            <Button variant="neon" size="sm">
              <Eye className="w-4 h-4" />
              Ver Detalhes
            </Button>
          </Link>
        </motion.div>
      </div>

      <div className="p-6">
        <h3 className="font-display font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {project.description}
        </p>

        <div className="flex items-center justify-between">
          <Link to={`/projeto/${project.id}`}>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
              Ver Projeto
            </Button>
          </Link>
          {project.external_link && (
            <a
              href={project.external_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="icon" className="w-8 h-8">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
