import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, getProjects } from "@/sanity/projects";
import CaseStudy from "@/components/work/case-study";

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = async () =>
  (await getProjects()).map(({ slug }) => ({ slug }));

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const project = await getProject((await params).slug);
  if (!project) return {};
  return {
    title: `${project.title} | Suraj Patil`,
    description: project.summary,
    openGraph: { images: [project.coverUrl] },
  };
};

const ProjectPage = async ({ params }: Props) => {
  const project = await getProject((await params).slug);
  if (!project) notFound();

  return <CaseStudy project={project} />;
};

export default ProjectPage;
