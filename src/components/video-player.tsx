"use client";

import { IKVideo } from "imagekitio-react";
import { PauseIcon, PlayIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface VideoPlayerProps {
  videoUrl: string;
  thumbnailUrl: string;
}

export function VideoPlayer({ videoUrl, thumbnailUrl }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  const [completed, setCompleted] = useState(0);
  const [buffered, setBuffered] = useState(0);

  useEffect(() => {
    let videoPlayerRef = videoRef.current;
    if (videoPlayerRef) {
      videoPlayerRef.addEventListener("timeupdate", (e) => {
        const completed =
          (videoPlayerRef?.currentTime / videoPlayerRef?.duration) * 100;
        if (Math.round(completed) >= 100.0) {
          setIsPlaying(false);
        }
        setCompleted(completed);
      });

      videoPlayerRef.addEventListener("progress", (e) => {
        const buffered =
          (videoPlayerRef?.buffered.end(videoPlayerRef?.buffered.length - 1) /
            videoPlayerRef?.duration) *
          100;
        setBuffered(buffered);
      });
    }
    return () => {
      videoPlayerRef?.removeEventListener("timeupdate", () => {});
      videoPlayerRef?.removeEventListener("progress", () => {});
    };
  }, []);

  const handleVideoClick = (play: boolean) => {
    if (play) {
      videoRef.current?.play();
      setIsPlaying(play);
    } else {
      videoRef.current?.pause();
      setIsPlaying(play);
    }
  };

  return (
    // <IKVideo

    //   urlEndpoint="https://ik.imagekit.io/rgsrmkbhv"
    //   src={videoUrl}
    //   playsInline
    //   //controls

    //   onClick={() => setIsPlaying(!isPlaying)}
    //   className="w-full h-full object-cover cursor-pointer"
    // />
    <div className="relative">
      <video
        src={videoUrl}
        ref={videoRef}
        muted
        className="w-full h-full object-cover"
      />

      {/** progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gray-200">
        <div className="h-full relative">
          <div
            style={{ width: `${completed}%` }}
            className="h-full absolute bg-primary"
          ></div>
          {/** buffer bar */}
          <div
            style={{ width: `${buffered}%` }}
            className="h-full absolute bg-primary/50"
          ></div>
        </div>
      </div>

      {/** play icon */}
      <span
        onClick={() => handleVideoClick(!isPlaying)}
        className={`absolute top-1/2 left-1/2 cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
          isPlaying ? "hidden" : ""
        }`}
      >
        <PlayIcon size={48} className="text-primary" />
      </span>

      {/** Pause icon */}
      <span
        onClick={() => handleVideoClick(!isPlaying)}
        className={`absolute right-0 bottom-0 cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
          isPlaying ? "" : "hidden"
        }`}
      >
        <PauseIcon size={48} className="text-primary" />
      </span>
    </div>
  );
}
