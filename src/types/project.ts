export interface Project {
  id: string;
  title: string;
  description: string;
  full_description: string | null;
  category: "sites" | "landing-pages" | "crms" | "micro-saas";
  thumbnail_url: string | null;
  external_link: string | null;
  status: "active" | "hidden";
  featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export type ProjectCategory = Project["category"];
export type ProjectStatus = Project["status"];

export const categoryLabels: Record<ProjectCategory, string> = {
  sites: "Sites",
  "landing-pages": "Landing Pages",
  crms: "CRMs",
  "micro-saas": "Micro-SaaS",
};

export const categoryColors: Record<ProjectCategory, string> = {
  sites: "bg-neon-purple/20 text-neon-purple border-neon-purple/30",
  "landing-pages": "bg-neon-pink/20 text-neon-pink border-neon-pink/30",
  crms: "bg-neon-blue/20 text-neon-blue border-neon-blue/30",
  "micro-saas": "bg-purple-500/20 text-purple-300 border-purple-500/30",
};
