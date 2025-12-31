import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { mockProjects } from "@/data/mockProjects";
import { ArrowLeft, ExternalLink, Calendar, Tag } from "lucide-react";
import { Helmet } from "react-helmet-async";

const categoryLabels: Record<string, string> = {
  sites: "Sites",
  "landing-pages": "Landing Pages",
  crms: "CRMs",
  "micro-saas": "Micro-SaaS",
};

const Project = () => {
  const { id } = useParams();
  const project = mockProjects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">
            Projeto não encontrado
          </h1>
          <Link to="/">
            <Button variant="neon">Voltar ao Portfólio</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{project.name} - Lápis Criativo</title>
        <meta name="description" content={project.shortDescription} />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-28 pb-20">
          <div className="container mx-auto px-6">
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" />
              Voltar ao Portfólio
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Project Image */}
              <div className="glass-card overflow-hidden">
                <div className="relative aspect-video">
                  <img
                    src={project.thumbnail}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                  {project.featured && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-primary text-primary-foreground border-0 shadow-glow">
                        ⭐ Projeto Destaque
                      </Badge>
                    </div>
                  )}
                </div>
              </div>

              {/* Project Info */}
              <div className="space-y-6">
                <div>
                  <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
                    <Tag className="w-3 h-3 mr-1" />
                    {categoryLabels[project.category]}
                  </Badge>
                  <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                    {project.name}
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    {project.shortDescription}
                  </p>
                </div>

                <div className="glass-card p-6 space-y-4">
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    Sobre o Projeto
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.fullDescription}
                  </p>
                </div>

                <div className="glass-card p-6">
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
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={project.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button variant="neon" size="xl" className="w-full">
                      <ExternalLink className="w-5 h-5" />
                      Abrir Projeto
                    </Button>
                  </a>
                  <Link to="/" className="flex-1">
                    <Button variant="glass" size="xl" className="w-full">
                      Ver Outros Projetos
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Project;
