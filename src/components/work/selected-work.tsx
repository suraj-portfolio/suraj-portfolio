import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Project } from "@/data/projects";
import { getProjects } from "@/sanity/projects";
import WorkCard from "./work-card";

/** Featured project first, then one project from each other category. */
const pickProjects = (projects: Project[], count: number) => {
  const picked: Project[] = projects.filter((p) => p.featured).slice(0, 1);
  for (const p of projects) {
    if (picked.length >= count) break;
    if (!picked.some((q) => q.category === p.category)) picked.push(p);
  }
  return picked;
};

const SelectedWork = async () => {
  const projects = await getProjects();
  return (
  <section className="py-12 xl:py-24">
    <div className="container mx-auto flex flex-col gap-10">
      <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
        <div className="flex flex-col items-center gap-3 md:items-start">
          <h2 className="section-title">Selected Work</h2>
          <p className="subtitle mb-0 max-w-xl text-center md:text-left">
            A few recent builds. See the full list, filterable by category and
            tech stack.
          </p>
        </div>
        <Button asChild className="hidden gap-x-2 md:inline-flex">
          <Link href="/work">
            View all {projects.length} projects <ArrowRight size={18} />
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {pickProjects(projects, 3).map((p) => (
          <WorkCard key={p.slug} project={p} />
        ))}
      </div>

      <Button asChild className="mx-auto gap-x-2 md:hidden">
        <Link href="/work">
          View all {projects.length} projects <ArrowRight size={18} />
        </Link>
      </Button>
    </div>
  </section>
  );
};

export default SelectedWork;
