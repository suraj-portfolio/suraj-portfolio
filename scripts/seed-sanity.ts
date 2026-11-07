/**
 * One-off import of src/data/projects.ts into Sanity.
 * Run: SANITY_WRITE_TOKEN=... npm run seed:sanity
 * Safe to re-run: documents use fixed ids (project-<slug>) and are replaced.
 */
import { createClient } from "@sanity/client";
import { localProjects } from "../src/data/projects";

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("Set SANITY_WRITE_TOKEN (Editor token from sanity.io/manage > API).");
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "p923n1kj",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

const key = () => Math.random().toString(36).slice(2, 12);
const withKeys = <T extends object>(items?: T[]) =>
  items?.map((i) => ({ _key: key(), ...i }));

const run = async () => {
  const tx = client.transaction();
  localProjects.forEach((p, i) => {
    tx.createOrReplace({
      _id: `project-${p.slug}`,
      _type: "project",
      title: p.title,
      slug: { _type: "slug", current: p.slug },
      summary: p.summary,
      description: p.description,
      category: p.category,
      tags: p.tags,
      featured: p.featured ?? false,
      year: p.year,
      order: (i + 1) * 10,
      highlights: p.highlights,
      features: p.features,
      stackFrontend: p.stack.frontend,
      stackBackend: p.stack.backend,
      stackDatabase: p.stack.database,
      stackServices: p.stack.services,
      stackInfra: p.stack.infra,
      videoUrl: p.videoUrl,
      coverUrl: p.coverUrl,
      githubUrl: p.githubUrl,
      liveUrl: p.liveUrl,
      apiDocsUrl: p.apiDocsUrl,
      dataModel: withKeys(p.dataModel),
      endpoints: withKeys(p.endpoints),
      challenges: p.challenges,
    });
  });
  await tx.commit();
  console.log(`Imported ${localProjects.length} projects.`);
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
