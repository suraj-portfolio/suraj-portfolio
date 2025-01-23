"use client";

import { IKVideo } from "imagekitio-react";

interface VideoPlayerProps {
  videoUrl: string;
  thumbnailUrl: string;
}

export function VideoPlayer({ videoUrl, thumbnailUrl }: VideoPlayerProps) {
  return (
    <IKVideo
      urlEndpoint="https://ik.imagekit.io/rgsrmkbhv"
      src={videoUrl}
      playsInline
      controls
      className="w-full h-full object-cover"
    />
  );
}
