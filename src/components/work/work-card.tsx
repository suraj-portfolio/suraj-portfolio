import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categoryLabels, type Project } from "@/data/projects";
import HoverVideo from "./hover-video";
import StackLine from "./stack-line";
import ProjectLinks from "./project-links";

const WorkCard = ({ project }: { project: Project }) => (
  <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-xl">
    <HoverVideo
      coverUrl={project.coverUrl}
      videoUrl={project.videoUrl}
      alt={`${project.title} preview`}
    />
    <div className="flex flex-1 flex-col gap-3 p-5">
      <div className="flex items-center justify-between gap-2 text-xs">
        <span className="font-semibold uppercase tracking-wide text-primary">
          {categoryLabels[project.category]}
        </span>
        <span className="text-muted-foreground">{project.year}</span>
      </div>
      <Link
        href={`/work/${project.slug}`}
        className="flex items-start justify-between gap-2 text-xl font-semibold hover:text-primary"
      >
        {project.title}
        <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </Link>
      <p className="text-sm text-muted-foreground">{project.summary}</p>
      <StackLine project={project} />
      <div className="flex flex-wrap gap-1.5">
        {project.highlights.map((h) => (
          <span
            key={h}
            className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
          >
            {h}
          </span>
        ))}
      </div>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
        <ProjectLinks project={project} size="sm" />
        <Link
          href={`/work/${project.slug}`}
          className="text-sm font-medium text-primary hover:underline"
        >
          Case study →
        </Link>
      </div>
    </div>
  </article>
);

export default WorkCard;
