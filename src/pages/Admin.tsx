import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Pencil,
  Plus,
  LogOut,
  LayoutDashboard,
  FolderOpen,
  Star,
  Eye,
  Loader2,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/hooks/useAuth";
import {
  useProjects,
  useCreateProject,
  useUpdateProject,
  useDeleteProject,
  useReorderProjects,
} from "@/hooks/useProjects";
import { Project } from "@/types/project";
import SortableProjectRow from "@/components/admin/SortableProjectRow";
import ProjectForm from "@/components/admin/ProjectForm";

const Admin = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteProject, setDeleteProject] = useState<Project | null>(null);
  const [localProjects, setLocalProjects] = useState<Project[]>([]);

  const navigate = useNavigate();
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const { data: projects, isLoading: projectsLoading } = useProjects(true);

  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProjectMutation = useDeleteProject();
  const reorderProjects = useReorderProjects();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/login");
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (projects) {
      setLocalProjects(projects);
    }
  }, [projects]);

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  const handleOpenDialog = (project?: Project) => {
    setEditingProject(project || null);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (data: Omit<Project, "id" | "created_at" | "updated_at">) => {
    if (editingProject) {
      await updateProject.mutateAsync({ id: editingProject.id, ...data });
    } else {
      await createProject.mutateAsync(data);
    }
    setIsDialogOpen(false);
    setEditingProject(null);
  };

  const handleDelete = async () => {
    if (deleteProject) {
      await deleteProjectMutation.mutateAsync(deleteProject.id);
      setDeleteProject(null);
    }
  };

  const handleToggleStatus = async (project: Project) => {
    const newStatus = project.status === "active" ? "hidden" : "active";
    await updateProject.mutateAsync({ id: project.id, status: newStatus });
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = localProjects.findIndex((p) => p.id === active.id);
      const newIndex = localProjects.findIndex((p) => p.id === over.id);

      const newOrder = arrayMove(localProjects, oldIndex, newIndex);
      setLocalProjects(newOrder);

      const updates = newOrder.map((project, index) => ({
        id: project.id,
        display_order: index,
      }));

      await reorderProjects.mutateAsync(updates);
    }
  };

  if (authLoading || projectsLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const stats = {
    total: localProjects.length,
    active: localProjects.filter((p) => p.status === "active").length,
    sites: localProjects.filter((p) => p.category === "sites").length,
    landingPages: localProjects.filter((p) => p.category === "landing-pages").length,
    crms: localProjects.filter((p) => p.category === "crms").length,
    microSaas: localProjects.filter((p) => p.category === "micro-saas").length,
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
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between mb-8"
            >
              <div>
                <h1 className="font-display text-3xl font-bold text-foreground">
                  Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Gerencie os projetos do portfólio (arraste para reordenar)
                </p>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="neon" onClick={() => handleOpenDialog()}>
                    <Plus className="w-5 h-5" />
                    Novo Projeto
                  </Button>
                </DialogTrigger>
                <ProjectForm
                  project={editingProject}
                  onSubmit={handleSubmit}
                  onClose={() => setIsDialogOpen(false)}
                  isSubmitting={createProject.isPending || updateProject.isPending}
                />
              </Dialog>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8"
            >
              {[
                { label: "Total", value: stats.total, icon: FolderOpen },
                { label: "Ativos", value: stats.active, icon: Eye },
                { label: "Sites", value: stats.sites, icon: LayoutDashboard },
                { label: "Landing Pages", value: stats.landingPages, icon: Star },
                { label: "CRMs", value: stats.crms, icon: LayoutDashboard },
                { label: "Micro-SaaS", value: stats.microSaas, icon: Star },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="glass-card p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Projects Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card overflow-hidden"
            >
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <Table>
                  <TableHeader>
                    <TableRow className="border-border hover:bg-transparent">
                      <TableHead className="w-10"></TableHead>
                      <TableHead className="text-muted-foreground">Projeto</TableHead>
                      <TableHead className="text-muted-foreground">Categoria</TableHead>
                      <TableHead className="text-muted-foreground">Status</TableHead>
                      <TableHead className="text-muted-foreground">Destaque</TableHead>
                      <TableHead className="text-muted-foreground text-right">
                        Ações
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <SortableContext
                      items={localProjects.map((p) => p.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      {localProjects.map((project) => (
                        <SortableProjectRow
                          key={project.id}
                          project={project}
                          onEdit={handleOpenDialog}
                          onDelete={setDeleteProject}
                          onToggleStatus={handleToggleStatus}
                        />
                      ))}
                    </SortableContext>
                  </TableBody>
                </Table>
              </DndContext>

              {localProjects.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Nenhum projeto cadastrado.</p>
                </div>
              )}
            </motion.div>
          </div>
        </main>

        {/* Delete Confirmation */}
        <AlertDialog open={!!deleteProject} onOpenChange={() => setDeleteProject(null)}>
          <AlertDialogContent className="bg-card border-border">
            <AlertDialogHeader>
              <AlertDialogTitle>Excluir projeto?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta ação não pode ser desfeita. O projeto "{deleteProject?.title}"
                será permanentemente removido.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};

export default Admin;
