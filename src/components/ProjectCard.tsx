import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Eye } from "lucide-react";

export interface Project {
  id: string;
  name: string;
  category: "sites" | "landing-pages" | "crms" | "micro-saas";
  shortDescription: string;
  fullDescription: string;
  thumbnail: string;
  externalLink: string;
  featured: boolean;
  status: "active" | "hidden";
}

interface ProjectCardProps {
  project: Project;
}

const categoryLabels: Record<Project["category"], string> = {
  sites: "Sites",
  "landing-pages": "Landing Pages",
  crms: "CRMs",
  "micro-saas": "Micro-SaaS",
};

const categoryColors: Record<Project["category"], string> = {
  sites: "bg-neon-purple/20 text-neon-purple border-neon-purple/30",
  "landing-pages": "bg-neon-pink/20 text-neon-pink border-neon-pink/30",
  crms: "bg-neon-blue/20 text-neon-blue border-neon-blue/30",
  "micro-saas": "bg-purple-500/20 text-purple-300 border-purple-500/30",
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="glass-card hover-lift group overflow-hidden">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.thumbnail}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {project.featured && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-gradient-primary text-primary-foreground border-0 shadow-glow">
              ⭐ Destaque
            </Badge>
          </div>
        )}

        <div className="absolute top-3 right-3">
          <Badge className={`border ${categoryColors[project.category]}`}>
            {categoryLabels[project.category]}
          </Badge>
        </div>

        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link to={`/projeto/${project.id}`}>
            <Button variant="neon" size="sm">
              <Eye className="w-4 h-4" />
              Ver Detalhes
            </Button>
          </Link>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-display font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
          {project.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {project.shortDescription}
        </p>

        <div className="flex items-center justify-between">
          <Link to={`/projeto/${project.id}`}>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
              Ver Projeto
            </Button>
          </Link>
          <a
            href={project.externalLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="icon" className="w-8 h-8">
              <ExternalLink className="w-4 h-4" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
