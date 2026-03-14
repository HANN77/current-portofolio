"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  direction?: "left" | "right";
  speed?: number; // seconds for one cycle
  pauseOnHover?: boolean;
  className?: string;
}

export default function Marquee({
  children,
  direction = "left",
  speed = 30,
  pauseOnHover = true,
  className,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "overflow-hidden whitespace-nowrap",
        pauseOnHover && "group",
        className
      )}
    >
      <div
        className={cn(
          "inline-flex",
          direction === "left" ? "animate-marquee" : "animate-marquee-reverse",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        style={{ ["--marquee-duration" as string]: `${speed}s` }}
      >
        {/* Duplicate children for seamless loop */}
        <div className="inline-flex items-center">{children}</div>
        <div className="inline-flex items-center" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
