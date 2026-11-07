import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import type { Project } from "@/data/projects";

const ProjectLinks = ({
  project,
  size = "default",
}: {
  project: Project;
  size?: "default" | "sm";
}) => (
  <div className="flex flex-wrap gap-3">
    {project.liveUrl && (
      <Button asChild size={size}>
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
          <ExternalLink className="mr-2 h-4 w-4" /> Live site
        </a>
      </Button>
    )}
    {project.githubUrl && (
      <Button asChild size={size} variant="outline">
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
          <FaGithub className="mr-2 h-4 w-4" /> Code
        </a>
      </Button>
    )}
    {project.apiDocsUrl && (
      <Button asChild size={size} variant="outline">
        <a href={project.apiDocsUrl} target="_blank" rel="noopener noreferrer">
          API docs
        </a>
      </Button>
    )}
  </div>
);

export default ProjectLinks;
