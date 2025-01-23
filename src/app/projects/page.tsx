"use client";
import React from "react";
import ProjectDetails from "@/components/project-details";

const Projects = () => {
  return (
    <section className="min-h-screen pt-12">
      <div className="container mx-auto">
        <h2 className="section-title mb-8 xl:mb-16 text-center mx-auto">
          My Projects
        </h2>

        <div className="container flex flex-col gap-8 mx-auto py-16">
          <ProjectDetails
            title="SAAS Code Editor"
            description="A code editor built with Next.js. It supports multiple themes, syntax highlighting, code formatting and code sharing."
            keyFeatures={[
              "💻 Online IDE with multi-language support (10 languages)",
              "🎨 Customizable experience with 5 VSCode themes",
              "✨ Smart output handling with Success & Error states",
              "💎 Flexible pricing with Free & Pro plans",
              "🤝 Community-driven code sharing system",
              "🔍 Advanced filtering & search capabilities",
              "👤 Personal profile with execution history tracking",
              "📊 Comprehensive statistics dashboard",
              "⚙️ Customizable font size controls",
              "🔗 Webhook integration support",
            ]}
            techStack={[
              "React",
              "Next.js",
              "TypeScript",
              "Tailwind CSS",
              "Framer Motion",
              "Shadcn UI",
              "Clerk",
              "lemonsqueezy",
            ]}
            videoUrl="https://ik.imagekit.io/rgsrmkbhv/YouCut_20250122_160314081.mp4"
            githubUrl="https://github.com/suraj1294/code-craft"
            liveUrl="https://code-it.suraj-patil.in"
            imageUrl="/placeholder.svg?height=720&width=1280"
          />

          <ProjectDetails
            title="Realtime Spotify Application"
            description="A real-time Spotify application built with react, express and monogoDB. It allows users to play songs, chat with friends and check out what their friends are listening to. Admin can add songs, albums and artists."
            keyFeatures={[
              "🎸 Listen to music, play next and previous songs",
              "🔈 Update the volume with a slider",
              "🎧 Admin dashboard to create albums and songs",
              " 💬 Real-time Chat App integrated into Spotify",
              "👨🏼‍💼 Online/Offline status",
              "👀 See what other users are listening to in real-time",
              "📊 Aggregate data for the analytics page",
              "🚀 And a lot more...",
            ]}
            techStack={[
              "React",
              "express",
              "monogoDB",
              "cloudinary",
              "TypeScript",
              "Tailwind CSS",
              "Framer Motion",
              "Shadcn UI",
              "Clerk",
            ]}
            videoUrl="https://ik.imagekit.io/rgsrmkbhv/YouCut_20250122_155745045.mp4"
            githubUrl="https://github.com/suraj-portfolio/spotify-app"
            liveUrl="https://spotify-app.suraj-patil.in"
            imageUrl="/placeholder.svg?height=720&width=1280"
          />

          <ProjectDetails
            title="A Game Store App"
            description="A game store app built with React, Typescript and RAWG api. It allows users to browse games, search for games and view game details"
            keyFeatures={[
              "🔎 Search for games",
              "🗒️ Filter by Genres and platforms",
              "✨ Infinite Scrolling",
              "🌓 Dark and light theme support",
              "👓 game details page",
            ]}
            techStack={[
              "React",
              "Typescript",
              "Chakra UI",
              "TanStack Query",
              "RAWG API",
              "Frame Motion",
              "zustand",
            ]}
            videoUrl="https://res.cloudinary.com/dtrmxxici/video/upload/v1737622917/GameHub_-_23_January_2025_1_nhjphi.mp4"
            githubUrl="https://github.com/suraj1294/game-store"
            liveUrl="https://raw-games-app.netlify.app"
            imageUrl="/placeholder.svg?height=720&width=1280"
          />
          <ProjectDetails
            title="XORA AI Landing Page"
            description="A landing page for XORA AI, a company that provides AI solutions for businesses. The landing page is built with React, Tailwind CSS and React Scroll."
            keyFeatures={[
              "😯 Beautifully designed landing page",
              "👏 Smooth Scrolling",
              "😍 Smooth animations",
            ]}
            techStack={["React", "Typescript", "Tailwind CSS", "React Scroll"]}
            videoUrl="https://res.cloudinary.com/dtrmxxici/video/upload/v1737622406/Xora_AI_-_23_January_2025_uomnt0.mp4"
            githubUrl="https://github.com/suraj-portfolio/saas-xora"
            liveUrl="https://saas-xora.suraj-patil.in"
            imageUrl="/placeholder.svg?height=720&width=1280"
          />
          <ProjectDetails
            title="Nextjs Advanced Authentication"
            description="A nextjs app with advanced authentication features like email verification, forgot password, social login, two-factor authentication, and more. This is built on top of auth.js v5 library."
            keyFeatures={[
              "😯 Beautifully designed landing page",
              "👏 Smooth Scrolling",
              "😍 Smooth animations",
            ]}
            techStack={[
              "React",
              "Typescript",
              "Tailwind CSS",
              "Turso DB",
              "Auth.js v5",
              "resend",
              "drizzle",
            ]}
            videoUrl="https://res.cloudinary.com/dtrmxxici/video/upload/v1737630538/01._Intro_Demo_b1aydy.mp4"
            githubUrl="https://github.com/suraj1294/next-auth-advanced"
            liveUrl="https://auth-v5.suraj-patil.in"
            imageUrl="/placeholder.svg?height=720&width=1280"
          />
        </div>
      </div>
    </section>
  );
};

export default Projects;
