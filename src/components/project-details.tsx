"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Layers } from "lucide-react";
import { VideoPlayer } from "@/components/video-player";

interface ProjectDetailsProps {
  title: string;
  description: string;
  keyFeatures: string[];
  techStack: string[];
  videoUrl: string;
  githubUrl: string;
  liveUrl: string;
  imageUrl: string;
}

export default function ProjectDetails({
  title,
  description,
  keyFeatures,
  techStack,
  videoUrl,
  githubUrl,
  liveUrl,
  imageUrl,
}: ProjectDetailsProps) {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-lg">
      <motion.h2
        className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>
      <motion.p
        className="text-lg text-gray-600 dark:text-gray-300 mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {description}
      </motion.p>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div>
            <h3 className="text-2xl font-semibold mb-3 text-gray-700 dark:text-gray-200">
              Key Features
            </h3>
            <ul className="space-y-2">
              {keyFeatures.map((feature, index) => (
                <motion.li
                  key={index}
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                >
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-3 text-gray-700 dark:text-gray-200">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                >
                  <Badge variant="outline" className="text-sm py-1 px-2">
                    <Layers className="w-3 h-3 mr-1" />
                    {tech}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Button asChild variant="outline">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <Github className="mr-2 h-4 w-4" /> View on GitHub
              </a>
            </Button>
            <Button asChild>
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <ExternalLink className="mr-2 h-4 w-4" /> Visit Live Site
              </a>
            </Button>
          </motion.div>

          <motion.div
            className="relative aspect-video rounded-lg overflow-hidden shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <div
              className="w-full h-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${imageUrl})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <VideoPlayer videoUrl={videoUrl} thumbnailUrl={imageUrl} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
