import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import {
  Pencil,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  LogOut,
  LayoutDashboard,
  FolderOpen,
  Star,
  Eye,
  EyeOff,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { mockProjects } from "@/data/mockProjects";
import { Project } from "@/components/ProjectCard";
import { Helmet } from "react-helmet-async";

const categoryLabels: Record<string, string> = {
  sites: "Sites",
  "landing-pages": "Landing Pages",
  crms: "CRMs",
  "micro-saas": "Micro-SaaS",
};

const Admin = () => {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    category: "sites" as Project["category"],
    shortDescription: "",
    fullDescription: "",
    thumbnail: "",
    externalLink: "",
    featured: false,
    status: "active" as Project["status"],
  });

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
    navigate("/login");
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "sites",
      shortDescription: "",
      fullDescription: "",
      thumbnail: "",
      externalLink: "",
      featured: false,
      status: "active",
    });
    setEditingProject(null);
  };

  const handleOpenDialog = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        name: project.name,
        category: project.category,
        shortDescription: project.shortDescription,
        fullDescription: project.fullDescription,
        thumbnail: project.thumbnail,
        externalLink: project.externalLink,
        featured: project.featured,
        status: project.status,
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProject) {
      setProjects(projects.map((p) =>
        p.id === editingProject.id
          ? { ...p, ...formData }
          : p
      ));
      toast({
        title: "Projeto atualizado!",
        description: `O projeto "${formData.name}" foi atualizado com sucesso.`,
      });
    } else {
      const newProject: Project = {
        id: Date.now().toString(),
        ...formData,
      };
      setProjects([newProject, ...projects]);
      toast({
        title: "Projeto criado!",
        description: `O projeto "${formData.name}" foi criado com sucesso.`,
      });
    }
    
    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (project: Project) => {
    setProjects(projects.filter((p) => p.id !== project.id));
    toast({
      title: "Projeto excluído",
      description: `O projeto "${project.name}" foi removido.`,
      variant: "destructive",
    });
  };

  const handleToggleStatus = (project: Project) => {
    const newStatus = project.status === "active" ? "hidden" : "active";
    setProjects(projects.map((p) =>
      p.id === project.id ? { ...p, status: newStatus } : p
    ));
    toast({
      title: newStatus === "active" ? "Projeto ativado" : "Projeto ocultado",
      description: `O projeto "${project.name}" foi ${newStatus === "active" ? "ativado" : "ocultado"}.`,
    });
  };

  const stats = {
    total: projects.length,
    active: projects.filter((p) => p.status === "active").length,
    sites: projects.filter((p) => p.category === "sites").length,
    landingPages: projects.filter((p) => p.category === "landing-pages").length,
    crms: projects.filter((p) => p.category === "crms").length,
    microSaas: projects.filter((p) => p.category === "micro-saas").length,
  };

  return (
    <>
      <Helmet>
        <title>Painel Admin - Lápis Criativo</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Sidebar */}
        <aside className="fixed left-0 top-0 bottom-0 w-64 bg-sidebar border-r border-sidebar-border p-6">
          <Link to="/" className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <Pencil className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-foreground">
                Lápis Criativo
              </span>
              <span className="text-xs text-muted-foreground -mt-0.5">
                Admin
              </span>
            </div>
          </Link>

          <nav className="space-y-2">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-sidebar-accent text-sidebar-accent-foreground">
              <LayoutDashboard className="w-5 h-5" />
              <span className="font-medium">Dashboard</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
              <FolderOpen className="w-5 h-5" />
              <span>Projetos</span>
            </div>
          </nav>

          <div className="absolute bottom-6 left-6 right-6">
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 mr-3" />
              Sair
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-display text-3xl font-bold text-foreground">
                  Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Gerencie os projetos do portfólio
                </p>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="neon" onClick={() => handleOpenDialog()}>
                    <Plus className="w-5 h-5" />
                    Novo Projeto
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl bg-card border-border">
                  <DialogHeader>
                    <DialogTitle className="font-display text-xl">
                      {editingProject ? "Editar Projeto" : "Novo Projeto"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Nome do Projeto</Label>
                        <Input
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Ex: TechFlow Dashboard"
                          className="bg-input border-border"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Categoria</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value: Project["category"]) =>
                            setFormData({ ...formData, category: value })
                          }
                        >
                          <SelectTrigger className="bg-input border-border">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sites">Sites</SelectItem>
                            <SelectItem value="landing-pages">Landing Pages</SelectItem>
                            <SelectItem value="crms">CRMs</SelectItem>
                            <SelectItem value="micro-saas">Micro-SaaS</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Descrição Curta</Label>
                      <Input
                        value={formData.shortDescription}
                        onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                        placeholder="Breve descrição do projeto (1-2 linhas)"
                        className="bg-input border-border"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Descrição Completa</Label>
                      <Textarea
                        value={formData.fullDescription}
                        onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                        placeholder="Descreva o objetivo, tipo de solução e nicho do projeto..."
                        className="bg-input border-border min-h-[120px]"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>URL da Thumbnail</Label>
                        <Input
                          value={formData.thumbnail}
                          onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                          placeholder="https://..."
                          className="bg-input border-border"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Link Externo</Label>
                        <Input
                          value={formData.externalLink}
                          onChange={(e) => setFormData({ ...formData, externalLink: e.target.value })}
                          placeholder="https://..."
                          className="bg-input border-border"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-8">
                      <div className="flex items-center gap-3">
                        <Switch
                          checked={formData.featured}
                          onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                        />
                        <Label>Projeto Destaque</Label>
                      </div>
                      <div className="flex items-center gap-3">
                        <Switch
                          checked={formData.status === "active"}
                          onCheckedChange={(checked) =>
                            setFormData({ ...formData, status: checked ? "active" : "hidden" })
                          }
                        />
                        <Label>Ativo no Portfólio</Label>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Cancelar
                      </Button>
                      <Button type="submit" variant="neon">
                        {editingProject ? "Salvar Alterações" : "Criar Projeto"}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
              {[
                { label: "Total", value: stats.total, icon: FolderOpen },
                { label: "Ativos", value: stats.active, icon: Eye },
                { label: "Sites", value: stats.sites, icon: LayoutDashboard },
                { label: "Landing Pages", value: stats.landingPages, icon: Star },
                { label: "CRMs", value: stats.crms, icon: LayoutDashboard },
                { label: "Micro-SaaS", value: stats.microSaas, icon: Star },
              ].map((stat, index) => (
                <div key={index} className="glass-card p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Projects Table */}
            <div className="glass-card overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-muted-foreground">Projeto</TableHead>
                    <TableHead className="text-muted-foreground">Categoria</TableHead>
                    <TableHead className="text-muted-foreground">Status</TableHead>
                    <TableHead className="text-muted-foreground">Destaque</TableHead>
                    <TableHead className="text-muted-foreground text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project.id} className="border-border">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img
                            src={project.thumbnail}
                            alt={project.name}
                            className="w-12 h-8 rounded object-cover"
                          />
                          <div>
                            <p className="font-medium text-foreground">{project.name}</p>
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {project.shortDescription}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-border">
                          {categoryLabels[project.category]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={project.status === "active"}
                            onCheckedChange={() => handleToggleStatus(project)}
                          />
                          <span className="text-sm text-muted-foreground">
                            {project.status === "active" ? (
                              <Eye className="w-4 h-4" />
                            ) : (
                              <EyeOff className="w-4 h-4" />
                            )}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {project.featured && (
                          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={project.externalLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </a>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleOpenDialog(project)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => handleDelete(project)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Admin;
