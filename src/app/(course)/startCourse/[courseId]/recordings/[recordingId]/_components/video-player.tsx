"use client";
import { cn } from "@/lib/utils";
import MuxPlayer from "@mux/mux-player-react";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface VideoPlayerProps {
  recordingId: string;
  courseId: string;
  title: string;
  nextChapterId: string;
  playbackId: string;
}
export default function VideoPlayer({
  recordingId,
  courseId,
  title,
  nextChapterId,
  playbackId,
}: VideoPlayerProps) {
  const [isVideoReady, setIsVideoReady] = useState(false);

  return (
    <div className="relative aspect-video">
      {!isVideoReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="w-8 h-8 text-secondary animate-spin" />
        </div>
      )}
      <MuxPlayer
        title={title}
        className={cn(!isVideoReady && "hidden")}
        onCanPlay={() => setIsVideoReady(true)}
        autoPlay
        playbackId={playbackId}
      />
    </div>
  );
}
