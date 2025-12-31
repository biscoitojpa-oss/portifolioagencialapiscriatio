import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  GripVertical,
  Edit,
  Trash2,
  ExternalLink,
  Star,
  Eye,
  EyeOff,
} from "lucide-react";
import { Project, categoryLabels } from "@/types/project";

interface SortableProjectRowProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
  onToggleStatus: (project: Project) => void;
}

const SortableProjectRow = ({
  project,
  onEdit,
  onDelete,
  onToggleStatus,
}: SortableProjectRowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <TableRow ref={setNodeRef} style={style} className="border-border">
      <TableCell className="w-10">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1 hover:bg-accent rounded"
        >
          <GripVertical className="w-4 h-4 text-muted-foreground" />
        </button>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-3">
          <img
            src={project.thumbnail_url || "/placeholder.svg"}
            alt={project.title}
            className="w-12 h-8 rounded object-cover"
          />
          <div>
            <p className="font-medium text-foreground">{project.title}</p>
            <p className="text-xs text-muted-foreground line-clamp-1">
              {project.description}
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
            onCheckedChange={() => onToggleStatus(project)}
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
          {project.external_link && (
            <a
              href={project.external_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8"
            onClick={() => onEdit(project)}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 text-destructive hover:text-destructive"
            onClick={() => onDelete(project)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default SortableProjectRow;
