"use client";

import { IKVideo } from "imagekitio-react";
import { useRef, useState } from "react";

interface VideoPlayerProps {
  videoUrl: string;
  thumbnailUrl: string;
}

export function VideoPlayer({ videoUrl, thumbnailUrl }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  if (isPlaying) {
    videoRef.current?.play();
  } else {
    videoRef.current?.pause();
  }

  return (
    // <IKVideo

    //   urlEndpoint="https://ik.imagekit.io/rgsrmkbhv"
    //   src={videoUrl}
    //   playsInline
    //   //controls

    //   onClick={() => setIsPlaying(!isPlaying)}
    //   className="w-full h-full object-cover cursor-pointer"
    // />

    <video
      src={videoUrl}
      ref={videoRef}
      muted
      onClick={() => setIsPlaying(!isPlaying)}
      className="w-full h-full object-cover cursor-pointer"
    />
  );
}
