import Link from "next/link";
import { Star } from "lucide-react";
import { categoryLabels, projectTech, type Project } from "@/data/projects";
import HoverVideo from "./hover-video";
import ProjectLinks from "./project-links";
import StackLine from "./stack-line";
import TechPill from "./tech-pill";

const FeaturedProject = ({ project }: { project: Project }) => (
  <article className="grid overflow-hidden rounded-2xl border border-border bg-card shadow-lg lg:grid-cols-[1.4fr_1fr]">
    <HoverVideo
      coverUrl={project.coverUrl}
      videoUrl={project.videoUrl}
      alt={`${project.title} preview`}
      priority
      className="lg:aspect-auto lg:min-h-full"
    />
    <div className="flex flex-col gap-4 p-6 lg:p-8">
      <div className="flex items-center gap-2 text-sm font-semibold text-primary">
        <Star className="h-4 w-4 fill-primary" /> Featured ·{" "}
        {categoryLabels[project.category]}
      </div>
      <Link
        href={`/work/${project.slug}`}
        className="text-3xl font-bold hover:text-primary"
      >
        {project.title}
      </Link>
      <p className="text-muted-foreground">{project.description}</p>
      <StackLine project={project} />
      <div className="flex flex-wrap gap-2">
        {projectTech(project).map((t) => (
          <TechPill key={t} name={t} />
        ))}
      </div>
      <div className="mt-auto flex flex-wrap items-center gap-4 pt-2">
        <ProjectLinks project={project} />
        <Link
          href={`/work/${project.slug}`}
          className="font-medium text-primary hover:underline"
        >
          Read case study →
        </Link>
      </div>
    </div>
  </article>
);

export default FeaturedProject;
