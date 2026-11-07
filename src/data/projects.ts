import { tech, type Ecosystem, type Layer } from "./tech";

export type Category =
  | "saas"
  | "realtime"
  | "dashboard"
  | "ecommerce"
  | "devtools"
  | "auth"
  | "frontend";

/** Tab order on the projects page. Tabs with no projects are hidden. */
export const categoryLabels: Record<Category, string> = {
  saas: "SaaS",
  realtime: "Real-time & Collaboration",
  dashboard: "Dashboards & Admin",
  ecommerce: "E-commerce",
  devtools: "Developer Tools",
  auth: "Auth & Security",
  frontend: "Frontend Apps",
};

export type Project = {
  slug: string;
  title: string;
  /** one line, shown on cards */
  summary: string;
  description: string;
  category: Category;
  /** extra categories the project also appears under */
  tags?: Category[];
  featured?: boolean;
  year: number;
  /** short capability labels, e.g. "Payments", "Real-time" */
  highlights: string[];
  stack: Partial<Record<Layer, string[]>>;
  features: string[];
  videoUrl: string;
  coverUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  apiDocsUrl?: string;
  // optional deep-dive sections for full-stack projects
  dataModel?: { name: string; fields: string }[];
  endpoints?: { method: string; path: string; description: string }[];
  challenges?: string[];
};

// Covers come from the demo videos via the CDNs' URL transforms.
const ikThumb = (url: string) => `${url}/ik-thumbnail.jpg`;
/** `offset` is how far into the video to grab the frame, e.g. "10p" = 10% */
const cldThumb = (url: string, offset = "10p") =>
  url
    .replace("/video/upload/", `/video/upload/so_${offset}/`)
    .replace(/\.mp4$/, ".jpg");

/** Cover frame for a demo video hosted on ImageKit or Cloudinary. */
export const deriveCover = (videoUrl: string) =>
  videoUrl.includes("ik.imagekit.io")
    ? ikThumb(videoUrl)
    : videoUrl.includes("res.cloudinary.com")
      ? cldThumb(videoUrl)
      : "";

const codeCraftVideo =
  "https://ik.imagekit.io/rgsrmkbhv/YouCut_20250122_160314081.mp4";
const spotifyVideo =
  "https://ik.imagekit.io/rgsrmkbhv/YouCut_20250122_155745045.mp4";
const gameStoreVideo =
  "https://res.cloudinary.com/dtrmxxici/video/upload/v1737622917/GameHub_-_23_January_2025_1_nhjphi.mp4";
const xoraVideo =
  "https://res.cloudinary.com/dtrmxxici/video/upload/v1737622406/Xora_AI_-_23_January_2025_uomnt0.mp4";
const authVideo =
  "https://res.cloudinary.com/dtrmxxici/video/upload/v1737630538/01._Intro_Demo_b1aydy.mp4";
const slackVideo =
  "https://res.cloudinary.com/dtrmxxici/video/upload/v1737723336/slack-clone.mp4";
const taskManagerVideo =
  "https://res.cloudinary.com/dtrmxxici/video/upload/v1737723310/jira-clone_k9naac.mp4";

/** Seed data and fallback when Sanity is unreachable or empty. */
export const localProjects: Project[] = [
  {
    slug: "code-craft",
    title: "Code Craft",
    summary: "SaaS online code editor with 10 languages, themes and Pro plans.",
    description:
      "A SaaS code editor built with Next.js. It supports multiple languages and themes, syntax highlighting, code formatting, community code sharing and paid Pro plans.",
    category: "saas",
    tags: ["devtools"],
    featured: true,
    year: 2025,
    highlights: ["Payments", "Auth", "Analytics", "Webhooks"],
    stack: {
      frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Shadcn UI"],
      services: ["Clerk", "Lemon Squeezy"],
    },
    features: [
      "💻 Online IDE with multi-language support (10 languages)",
      "🎨 Customizable experience with 5 VS Code themes",
      "✨ Smart output handling with success and error states",
      "💎 Flexible pricing with Free and Pro plans",
      "🤝 Community-driven code sharing",
      "🔍 Advanced filtering and search",
      "👤 Personal profile with execution history",
      "📊 Statistics dashboard",
      "⚙️ Adjustable font size",
      "🔗 Webhook integration",
    ],
    videoUrl: codeCraftVideo,
    coverUrl: ikThumb(codeCraftVideo),
    githubUrl: "https://github.com/suraj1294/code-craft",
    liveUrl: "https://code-it.suraj-patil.in",
  },
  {
    slug: "task-manager",
    title: "Task Manager",
    summary: "Jira-like project and task tracker with workspaces and calendar view.",
    description:
      "A Jira-like task manager built with Next.js, Hono and Appwrite. It supports workspaces, projects, task tracking with table and calendar views, and team invites.",
    category: "saas",
    tags: ["dashboard"],
    year: 2025,
    highlights: ["Auth", "Teams", "Calendar"],
    stack: {
      frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Shadcn UI"],
      backend: ["Hono"],
      database: ["Appwrite"],
    },
    features: [
      "👥 Manage workspaces",
      "📝 Create projects and tasks",
      "🔒 Assign tasks to team members",
      "🔍 Search tasks",
      "📊 Track progress in a personal task view",
      "📅 Calendar view for tasks",
      "📋 Table view for tasks",
      "🔐 Authentication and data management with Appwrite",
      "✉️ Invite users to a workspace",
    ],
    videoUrl: taskManagerVideo,
    coverUrl: cldThumb(taskManagerVideo),
    githubUrl: "https://github.com/suraj1294/task-manager",
    liveUrl: "https://task-manager.suraj-patil.in",
  },
  {
    slug: "slack-clone",
    title: "Slack Clone",
    summary: "Real-time team chat with workspaces, channels, threads and files.",
    description:
      "A full-featured Slack clone built with Next.js, Convex and Tailwind CSS. It supports real-time messaging, channels, workspaces, threads and user authentication.",
    category: "realtime",
    tags: ["saas"],
    year: 2025,
    highlights: ["Real-time", "Auth", "File uploads"],
    stack: {
      frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      backend: ["Convex"],
    },
    features: [
      "🔐 Authentication with Next.js and Convex",
      "🌐 Real-time messaging within workspaces",
      "🔒 Invite users to workspaces with an invite code",
      "💬 Reply to threads",
      "🗂️ Create channels and workspaces",
      "📎 Send files in messages",
      "👥 Delegate group management to members",
    ],
    videoUrl: slackVideo,
    coverUrl: cldThumb(slackVideo),
    githubUrl: "https://github.com/suraj1294/slack-app",
    liveUrl: "https://slack.suraj-patil.in",
  },
  {
    slug: "spotify-clone",
    title: "Real-time Spotify App",
    summary: "Music player with live chat, friend activity and an admin dashboard.",
    description:
      "A real-time Spotify-style app built with React, Express and MongoDB. Users can play songs, chat with friends and see what friends are listening to. Admins can add songs, albums and artists.",
    category: "realtime",
    tags: ["dashboard"],
    year: 2025,
    highlights: ["Real-time", "Admin", "Analytics"],
    stack: {
      frontend: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Shadcn UI"],
      backend: ["Express"],
      database: ["MongoDB"],
      services: ["Clerk", "Cloudinary"],
    },
    features: [
      "🎸 Play music, skip to next and previous songs",
      "🔈 Volume slider",
      "🎧 Admin dashboard to create albums and songs",
      "💬 Real-time chat built into the app",
      "👨🏼‍💼 Online and offline status",
      "👀 See what other users are listening to in real time",
      "📊 Aggregated data for the analytics page",
    ],
    videoUrl: spotifyVideo,
    coverUrl: ikThumb(spotifyVideo),
    githubUrl: "https://github.com/suraj-portfolio/spotify-app",
    liveUrl: "https://spotify-app.suraj-patil.in",
  },
  {
    slug: "nextjs-advanced-auth",
    title: "Next.js Advanced Authentication",
    summary: "Auth.js v5 starter with OAuth, 2FA, email verification and roles.",
    description:
      "A Next.js app with advanced authentication: email verification, forgot password, social login, two-factor authentication and admin-only routes. Built on Auth.js v5.",
    category: "auth",
    year: 2025,
    highlights: ["Auth", "2FA", "OAuth", "Roles"],
    stack: {
      frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      backend: ["Auth.js", "Drizzle"],
      database: ["Turso"],
      services: ["Resend"],
    },
    features: [
      "🔐 Next-auth v5 (Auth.js)",
      "🌐 Social login with Google and GitHub",
      "🔒 Forgot password",
      "✉️ Email verification",
      "🔑 Two-factor authentication",
      "🛡️ Admin-only API routes",
      "🔐 Admin-only server actions",
    ],
    videoUrl: authVideo,
    coverUrl: cldThumb(authVideo),
    githubUrl: "https://github.com/suraj1294/next-auth-advanced",
    liveUrl: "https://auth-v5.suraj-patil.in",
  },
  {
    slug: "game-store",
    title: "Game Store",
    summary: "Game discovery app with search, genre filters and infinite scroll.",
    description:
      "A game store app built with React, TypeScript and the RAWG API. Users can browse, search and filter games and view game details.",
    category: "frontend",
    year: 2025,
    highlights: ["Infinite scroll", "Dark mode"],
    stack: {
      frontend: ["React", "TypeScript", "Chakra UI", "TanStack Query", "Zustand", "Framer Motion"],
      services: ["RAWG API"],
      infra: ["Netlify"],
    },
    features: [
      "🔎 Search for games",
      "🗒️ Filter by genre and platform",
      "✨ Infinite scrolling",
      "🌓 Dark and light themes",
      "👓 Game details page",
    ],
    videoUrl: gameStoreVideo,
    coverUrl: cldThumb(gameStoreVideo, "30p"),
    githubUrl: "https://github.com/suraj1294/game-store",
    liveUrl: "https://raw-games-app.netlify.app",
  },
  {
    slug: "xora-landing-page",
    title: "XORA AI Landing Page",
    summary: "Animated marketing site for an AI company with smooth scrolling.",
    description:
      "A landing page for XORA AI, a company that provides AI solutions for businesses. Built with React, Tailwind CSS and React Scroll.",
    category: "frontend",
    year: 2025,
    highlights: ["Animations", "Responsive"],
    stack: {
      frontend: ["React", "TypeScript", "Tailwind CSS", "React Scroll"],
    },
    features: [
      "😯 Polished landing page design",
      "👏 Smooth scrolling",
      "😍 Smooth animations",
    ],
    videoUrl: xoraVideo,
    coverUrl: cldThumb(xoraVideo),
    githubUrl: "https://github.com/suraj-portfolio/saas-xora",
    liveUrl: "https://saas-xora.suraj-patil.in",
  },
];

export const projectCategories = (p: Project) => [p.category, ...(p.tags ?? [])];

export const projectTech = (p: Project) =>
  Object.values(p.stack)
    .flat()
    .filter((t): t is string => Boolean(t));

export const projectEcosystem = (p: Project): Ecosystem | undefined =>
  projectTech(p)
    .map((t) => tech[t]?.ecosystem)
    .find(Boolean);

/** "Next.js → Hono → Appwrite": main framework of each layer present */
export const stackSummary = (p: Project) =>
  (["frontend", "backend", "database"] as const)
    .map((layer) => p.stack[layer]?.[0])
    .filter((t): t is string => Boolean(t));
