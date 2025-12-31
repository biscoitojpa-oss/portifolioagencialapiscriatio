import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Project } from "@/types/project";
import { useToast } from "@/hooks/use-toast";

type DbProject = {
  id: string;
  title: string;
  description: string;
  full_description: string | null;
  category: string;
  thumbnail_url: string | null;
  external_link: string | null;
  status: string;
  featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
};

const mapDbToProject = (dbProject: DbProject): Project => ({
  ...dbProject,
  category: dbProject.category as Project["category"],
  status: dbProject.status as Project["status"],
});

export const useProjects = (includeHidden = false) => {
  return useQuery({
    queryKey: ["projects", includeHidden],
    queryFn: async () => {
      let query = supabase
        .from("projects")
        .select("*")
        .order("display_order", { ascending: true });

      if (!includeHidden) {
        query = query.eq("status", "active");
      }

      const { data, error } = await query;

      if (error) throw error;
      return (data as DbProject[]).map(mapDbToProject);
    },
  });
};

export const useProject = (id: string) => {
  return useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return mapDbToProject(data as DbProject);
    },
    enabled: !!id,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (project: Omit<Project, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("projects")
        .insert([project])
        .select()
        .single();

      if (error) throw error;
      return mapDbToProject(data as DbProject);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast({
        title: "Projeto criado!",
        description: "O projeto foi criado com sucesso.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao criar projeto",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...project }: Partial<Project> & { id: string }) => {
      const { data, error } = await supabase
        .from("projects")
        .update(project)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return mapDbToProject(data as DbProject);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast({
        title: "Projeto atualizado!",
        description: "As alterações foram salvas.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao atualizar projeto",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast({
        title: "Projeto excluído",
        description: "O projeto foi removido.",
        variant: "destructive",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao excluir projeto",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useReorderProjects = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (projects: { id: string; display_order: number }[]) => {
      const promises = projects.map(({ id, display_order }) =>
        supabase.from("projects").update({ display_order }).eq("id", id)
      );
      const results = await Promise.all(promises);
      const error = results.find((r) => r.error)?.error;
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast({
        title: "Ordem atualizada!",
        description: "A ordem dos projetos foi salva.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao reordenar",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
