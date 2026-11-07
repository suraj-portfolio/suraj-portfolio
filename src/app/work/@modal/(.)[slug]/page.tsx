import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject } from "@/sanity/projects";
import CaseStudy from "@/components/work/case-study";
import ProjectModal from "@/components/work/project-modal";

type Props = { params: Promise<{ slug: string }> };

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const project = await getProject((await params).slug);
  return project ? { title: `${project.title} | Suraj Patil` } : {};
};

/** Intercepts /work/[slug] when navigating from /work and shows it as a modal. */
const ProjectModalPage = async ({ params }: Props) => {
  const project = await getProject((await params).slug);
  if (!project) notFound();

  return (
    <ProjectModal
      key={project.slug}
      project={{ slug: project.slug, title: project.title }}
    >
      <CaseStudy project={project} inModal />
    </ProjectModal>
  );
};

export default ProjectModalPage;
