"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface RevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  className?: string;
}

export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 1,
  className = "",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  const getInitialValues = () => {
    switch (direction) {
      case "up": return { y: 80, x: 0 };
      case "down": return { y: -80, x: 0 };
      case "left": return { x: 80, y: 0 };
      case "right": return { x: -80, y: 0 };
    }
  };

  useGSAP(() => {
    const initial = getInitialValues();
    gsap.fromTo(
      ref.current,
      { opacity: 0, ...initial },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, { scope: ref });

  return (
    <div ref={ref} className={`opacity-0 ${className}`}>
      {children}
    </div>
  );
}
