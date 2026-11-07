import { cache } from "react";
import { client } from "./client";
import {
  deriveCover,
  localProjects,
  type Category,
  type Project,
} from "@/data/projects";

const QUERY = `*[_type == "project" && defined(slug.current)]
  | order(coalesce(order, 9999) asc, year desc) {
  "slug": slug.current,
  title, summary, description, category, tags, featured, year, highlights, features,
  stackFrontend, stackBackend, stackDatabase, stackServices, stackInfra,
  videoUrl,
  "coverUrl": coalesce(coverImage.asset->url, coverUrl),
  githubUrl, liveUrl, apiDocsUrl, dataModel, endpoints, challenges
}`;

type Row = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  category: Category;
  tags: Category[] | null;
  featured: boolean | null;
  year: number;
  highlights: string[] | null;
  features: string[] | null;
  stackFrontend: string[] | null;
  stackBackend: string[] | null;
  stackDatabase: string[] | null;
  stackServices: string[] | null;
  stackInfra: string[] | null;
  videoUrl: string;
  coverUrl: string | null;
  githubUrl: string | null;
  liveUrl: string | null;
  apiDocsUrl: string | null;
  dataModel: { name: string; fields: string }[] | null;
  endpoints: { method: string; path: string; description?: string }[] | null;
  challenges: string[] | null;
};

const nonEmpty = <T,>(a: T[] | null) => (a && a.length ? a : undefined);

const toProject = (r: Row): Project => ({
  slug: r.slug,
  title: r.title,
  summary: r.summary,
  description: r.description,
  category: r.category,
  tags: nonEmpty(r.tags),
  featured: r.featured ?? false,
  year: r.year,
  highlights: r.highlights ?? [],
  stack: {
    frontend: nonEmpty(r.stackFrontend),
    backend: nonEmpty(r.stackBackend),
    database: nonEmpty(r.stackDatabase),
    services: nonEmpty(r.stackServices),
    infra: nonEmpty(r.stackInfra),
  },
  features: r.features ?? [],
  videoUrl: r.videoUrl,
  coverUrl: r.coverUrl ?? deriveCover(r.videoUrl),
  githubUrl: r.githubUrl ?? undefined,
  liveUrl: r.liveUrl ?? undefined,
  apiDocsUrl: r.apiDocsUrl ?? undefined,
  dataModel: nonEmpty(r.dataModel),
  endpoints: r.endpoints?.length
    ? r.endpoints.map((e) => ({ ...e, description: e.description ?? "" }))
    : undefined,
  challenges: nonEmpty(r.challenges),
});

/** All projects from Sanity; falls back to src/data/projects.ts until content exists. */
export const getProjects = cache(async (): Promise<Project[]> => {
  try {
    const rows = await client.fetch<Row[]>(QUERY, {}, { next: { revalidate: 60 } });
    if (rows.length) return rows.map(toProject);
  } catch (error) {
    console.error("Sanity fetch failed, using local projects", error);
  }
  return localProjects;
});

export const getProject = async (slug: string) =>
  (await getProjects()).find((p) => p.slug === slug);
