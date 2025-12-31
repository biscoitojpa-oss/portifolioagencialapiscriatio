import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Upload, Loader2 } from "lucide-react";
import { Project, ProjectCategory, ProjectStatus } from "@/types/project";
import { useImageUpload } from "@/hooks/useImageUpload";

interface ProjectFormProps {
  project?: Project | null;
  onSubmit: (data: Omit<Project, "id" | "created_at" | "updated_at">) => void;
  onClose: () => void;
  isSubmitting?: boolean;
}

const ProjectForm = ({ project, onSubmit, onClose, isSubmitting }: ProjectFormProps) => {
  const [formData, setFormData] = useState({
    title: project?.title || "",
    category: (project?.category || "sites") as ProjectCategory,
    description: project?.description || "",
    full_description: project?.full_description || "",
    thumbnail_url: project?.thumbnail_url || "",
    external_link: project?.external_link || "",
    featured: project?.featured || false,
    status: (project?.status || "active") as ProjectStatus,
    display_order: project?.display_order || 0,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadImage, uploading } = useImageUpload();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = await uploadImage(file);
      if (url) {
        setFormData({ ...formData, thumbnail_url: url });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <DialogContent className="max-w-2xl bg-card border-border">
      <DialogHeader>
        <DialogTitle className="font-display text-xl">
          {project ? "Editar Projeto" : "Novo Projeto"}
        </DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-6 mt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Nome do Projeto</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Ex: TechFlow Dashboard"
              className="bg-input border-border"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Categoria</Label>
            <Select
              value={formData.category}
              onValueChange={(value: ProjectCategory) =>
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
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Breve descrição do projeto (1-2 linhas)"
            className="bg-input border-border"
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Descrição Completa</Label>
          <Textarea
            value={formData.full_description || ""}
            onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
            placeholder="Descreva o objetivo, tipo de solução e nicho do projeto..."
            className="bg-input border-border min-h-[120px]"
          />
        </div>

        <div className="space-y-2">
          <Label>Thumbnail</Label>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                value={formData.thumbnail_url || ""}
                onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                placeholder="URL da imagem ou faça upload"
                className="bg-input border-border"
              />
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Upload className="w-4 h-4" />
              )}
              Upload
            </Button>
          </div>
          {formData.thumbnail_url && (
            <img
              src={formData.thumbnail_url}
              alt="Preview"
              className="w-32 h-20 object-cover rounded mt-2"
            />
          )}
        </div>

        <div className="space-y-2">
          <Label>Link Externo</Label>
          <Input
            value={formData.external_link || ""}
            onChange={(e) => setFormData({ ...formData, external_link: e.target.value })}
            placeholder="https://..."
            className="bg-input border-border"
          />
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
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="neon" disabled={isSubmitting || uploading}>
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : null}
            {project ? "Salvar Alterações" : "Criar Projeto"}
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};

export default ProjectForm;
