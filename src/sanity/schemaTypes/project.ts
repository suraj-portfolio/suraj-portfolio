import { defineArrayMember, defineField, defineType } from "sanity";
import { categoryLabels } from "@/data/projects";

const tagList = (
  name: string,
  title: string,
  description?: string,
  group?: string,
) =>
  defineField({
    name,
    title,
    description,
    group,
    type: "array",
    of: [defineArrayMember({ type: "string" })],
    options: { layout: "tags" },
  });

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  groups: [
    { name: "main", title: "Main", default: true },
    { name: "stack", title: "Stack" },
    { name: "media", title: "Media & links" },
    { name: "deepdive", title: "Deep dive" },
  ],
  orderings: [
    {
      title: "Manual order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  fields: [
    defineField({
      name: "title",
      type: "string",
      group: "main",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      group: "main",
      options: { source: "title", maxLength: 60 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "summary",
      description: "One line, shown on cards.",
      type: "string",
      group: "main",
      validation: (r) => r.required().max(140),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 4,
      group: "main",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      group: "main",
      options: {
        list: Object.entries(categoryLabels).map(([value, title]) => ({
          value,
          title,
        })),
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tags",
      title: "Also appears under",
      type: "array",
      group: "main",
      of: [defineArrayMember({ type: "string" })],
      options: {
        list: Object.entries(categoryLabels).map(([value, title]) => ({
          value,
          title,
        })),
      },
    }),
    defineField({
      name: "featured",
      description: "Shown large at the top of /work and first on the home page. Use on one project.",
      type: "boolean",
      group: "main",
      initialValue: false,
    }),
    defineField({
      name: "year",
      type: "number",
      group: "main",
      validation: (r) => r.required().integer().min(2015),
    }),
    defineField({
      name: "order",
      description: "Lower numbers come first. Leave empty to sort by year.",
      type: "number",
      group: "main",
    }),
    tagList("highlights", "Highlights", 'Short capability labels, e.g. "Payments", "Real-time".'),
    defineField({
      name: "features",
      title: "Key features",
      type: "array",
      group: "main",
      of: [defineArrayMember({ type: "string" })],
    }),

    tagList("stackFrontend", "Frontend", "e.g. Next.js, Vue, Nuxt, TanStack Query. First item is the main framework.", "stack"),
    tagList("stackBackend", "Backend", "e.g. NestJS, Hono, Express.", "stack"),
    tagList("stackDatabase", "Database", "e.g. PostgreSQL, MongoDB.", "stack"),
    tagList("stackServices", "Services", "e.g. Clerk, Resend.", "stack"),
    tagList("stackInfra", "Hosting", "e.g. Vercel, Docker.", "stack"),

    defineField({
      name: "videoUrl",
      title: "Demo video URL",
      description: "Direct .mp4 link. Plays muted on hover and in the project page.",
      type: "url",
      group: "media",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "coverImage",
      description: "Optional. If empty, the cover is taken from the video (ImageKit / Cloudinary links only) or the cover URL below.",
      type: "image",
      group: "media",
      options: { hotspot: true },
    }),
    defineField({ name: "coverUrl", title: "Cover URL", type: "url", group: "media" }),
    defineField({ name: "githubUrl", title: "GitHub URL", type: "url", group: "media" }),
    defineField({ name: "liveUrl", title: "Live URL", type: "url", group: "media" }),
    defineField({ name: "apiDocsUrl", title: "API docs URL", type: "url", group: "media" }),

    defineField({
      name: "dataModel",
      type: "array",
      group: "deepdive",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "name", type: "string", validation: (r) => r.required() }),
            defineField({ name: "fields", type: "string", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "name", subtitle: "fields" } },
        }),
      ],
    }),
    defineField({
      name: "endpoints",
      title: "API endpoints",
      type: "array",
      group: "deepdive",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "method",
              type: "string",
              options: { list: ["GET", "POST", "PUT", "PATCH", "DELETE"] },
              validation: (r) => r.required(),
            }),
            defineField({ name: "path", type: "string", validation: (r) => r.required() }),
            defineField({ name: "description", type: "string" }),
          ],
          preview: { select: { title: "path", subtitle: "method" } },
        }),
      ],
    }),
    defineField({
      name: "challenges",
      title: "Challenges & learnings",
      type: "array",
      group: "deepdive",
      of: [defineArrayMember({ type: "string" })],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "summary", media: "coverImage" },
  },
});
