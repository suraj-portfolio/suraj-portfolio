import type { IconType } from "react-icons";
import {
  SiAppwrite,
  SiChakraui,
  SiClerk,
  SiCloudinary,
  SiConvex,
  SiDocker,
  SiDrizzle,
  SiExpress,
  SiFramer,
  SiGraphql,
  SiHono,
  SiLemonsqueezy,
  SiMongodb,
  SiNestjs,
  SiNetlify,
  SiNextdotjs,
  SiNuxt,
  SiPinia,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiReactquery,
  SiRedis,
  SiResend,
  SiShadcnui,
  SiSocketdotio,
  SiSupabase,
  SiTailwindcss,
  SiTanstack,
  SiTurso,
  SiTypescript,
  SiVercel,
  SiVuedotjs,
} from "react-icons/si";

export type Layer = "frontend" | "backend" | "database" | "services" | "infra";

export const layerLabels: Record<Layer, string> = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
  services: "Services",
  infra: "Hosting",
};

export type Ecosystem = "react" | "vue";

export const ecosystemLabels: Record<Ecosystem, string> = {
  react: "React",
  vue: "Vue",
};

type TechInfo = {
  icon?: IconType;
  /** shown as a filter chip on the projects page */
  filterable?: boolean;
  /** frameworks that place a project in an ecosystem */
  ecosystem?: Ecosystem;
};

/**
 * Every tech used in src/data/projects.ts. Adding a tech is one line here;
 * unknown names still render, just without an icon.
 */
export const tech: Record<string, TechInfo> = {
  // frontend
  React: { icon: SiReact, filterable: true, ecosystem: "react" },
  "Next.js": { icon: SiNextdotjs, filterable: true, ecosystem: "react" },
  Vue: { icon: SiVuedotjs, filterable: true, ecosystem: "vue" },
  Nuxt: { icon: SiNuxt, filterable: true, ecosystem: "vue" },
  TypeScript: { icon: SiTypescript },
  "Tailwind CSS": { icon: SiTailwindcss },
  "Framer Motion": { icon: SiFramer },
  "Shadcn UI": { icon: SiShadcnui },
  "Chakra UI": { icon: SiChakraui },
  "TanStack Query": { icon: SiReactquery, filterable: true },
  "TanStack Start": { icon: SiTanstack, filterable: true },
  Zustand: {},
  Pinia: { icon: SiPinia },
  "React Scroll": {},
  // backend
  NestJS: { icon: SiNestjs, filterable: true },
  Express: { icon: SiExpress, filterable: true },
  Hono: { icon: SiHono, filterable: true },
  Convex: { icon: SiConvex, filterable: true },
  "Auth.js": {},
  Drizzle: { icon: SiDrizzle },
  Prisma: { icon: SiPrisma },
  GraphQL: { icon: SiGraphql },
  "Socket.io": { icon: SiSocketdotio },
  // database
  PostgreSQL: { icon: SiPostgresql, filterable: true },
  MongoDB: { icon: SiMongodb, filterable: true },
  Turso: { icon: SiTurso, filterable: true },
  Appwrite: { icon: SiAppwrite, filterable: true },
  Supabase: { icon: SiSupabase, filterable: true },
  Redis: { icon: SiRedis },
  // services
  Clerk: { icon: SiClerk },
  "Lemon Squeezy": { icon: SiLemonsqueezy },
  Cloudinary: { icon: SiCloudinary },
  Resend: { icon: SiResend },
  "RAWG API": {},
  // infra
  Vercel: { icon: SiVercel },
  Netlify: { icon: SiNetlify },
  Docker: { icon: SiDocker },
};

export const techIcon = (name: string) => tech[name]?.icon;
