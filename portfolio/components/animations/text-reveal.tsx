"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  stagger?: number;
}

export default function TextReveal({
  text,
  className = "",
  delay = 0,
  as: Tag = "h2",
  stagger = 0.04,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const words = containerRef.current?.querySelectorAll(".word");
    if (!words) return;

    gsap.fromTo(
      words,
      {
        y: 120,
        opacity: 0,
        rotateX: -80,
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1.2,
        stagger,
        delay,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, { scope: containerRef });

  const words = text.split(" ");

  return (
    <div ref={containerRef} style={{ perspective: "1000px" }}>
      <Tag className={className}>
        {words.map((word, i) => (
          <span
            key={i}
            className="word inline-block mr-[0.3em] origin-bottom"
            style={{ willChange: "transform, opacity" }}
          >
            {word}
          </span>
        ))}
      </Tag>
    </div>
  );
}
