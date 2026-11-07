import type { Metadata } from "next";
import { getProjects } from "@/sanity/projects";
import FeaturedProject from "@/components/work/featured-project";
import WorkGallery from "@/components/work/work-gallery";

export const metadata: Metadata = {
  title: "Work | Suraj Patil",
  description:
    "Full-stack and frontend projects by Suraj Patil, grouped by type and filterable by tech stack.",
};

const Work = async () => {
  const projects = await getProjects();
  const featured = projects.find((p) => p.featured);

  return (
    <section className="min-h-screen pb-24 pt-12">
      <div className="container mx-auto flex flex-col gap-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="section-title mx-auto">My Work</h2>
          <p className="subtitle mx-auto max-w-2xl">
            Full-stack products, real-time apps and polished frontends. Pick a
            category or filter by the stack you care about.
          </p>
        </div>

        {featured && <FeaturedProject project={featured} />}

        <WorkGallery projects={projects} />
      </div>
    </section>
  );
};

export default Work;
