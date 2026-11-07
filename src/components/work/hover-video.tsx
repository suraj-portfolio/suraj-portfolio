"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Shows the cover image; the muted demo video loads and plays only while
 * hovered, so a page full of cards doesn't download every video up front.
 */
const HoverVideo = ({
  coverUrl,
  videoUrl,
  alt,
  priority,
  className,
}: {
  coverUrl: string;
  videoUrl: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);
  const [playing, setPlaying] = useState(false);
  const hovered = useRef(false);

  const start = () => {
    hovered.current = true;
    // first hover mounts the video, which autoplays; later hovers resume it
    if (active) videoRef.current?.play().catch(() => {});
    else setActive(true);
  };
  const stop = () => {
    hovered.current = false;
    videoRef.current?.pause();
    setPlaying(false);
  };
  const onPlaying = () => {
    // autoplay can start after the pointer has already left
    if (hovered.current) setPlaying(true);
    else videoRef.current?.pause();
  };

  return (
    <div
      className={cn("relative aspect-video overflow-hidden bg-muted", className)}
      onMouseEnter={start}
      onMouseLeave={stop}
    >
      <Image
        src={coverUrl}
        alt={alt}
        fill
        priority={priority}
        sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
        className="object-cover"
      />
      {active && (
        <video
          ref={videoRef}
          src={videoUrl}
          muted
          loop
          autoPlay
          playsInline
          onPlaying={onPlaying}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
            playing ? "opacity-100" : "opacity-0",
          )}
        />
      )}
      <span
        className={cn(
          "pointer-events-none absolute bottom-3 right-3 flex items-center [@media(hover:none)]:hidden gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs text-white transition-opacity",
          playing ? "opacity-0" : "opacity-100",
        )}
      >
        <Play className="h-3 w-3" /> Hover to preview
      </span>
    </div>
  );
};

export default HoverVideo;
