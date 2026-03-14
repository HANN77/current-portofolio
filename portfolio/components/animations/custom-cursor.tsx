"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { usePortfolioStore } from "@/lib/store";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const { cursorVariant, cursorLabel } = usePortfolioStore();

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Size & style based on variant
  const variants: Record<string, { width: number; height: number; bgOpacity: number }> = {
    default: { width: 12, height: 12, bgOpacity: 1 },
    pointer: { width: 48, height: 48, bgOpacity: 0.15 },
    label: { width: 96, height: 96, bgOpacity: 0.9 },
    hidden: { width: 0, height: 0, bgOpacity: 0 },
  };

  const current = variants[cursorVariant] || variants.default;

  return (
    <>
      {/* Main cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none mix-blend-difference hidden md:flex items-center justify-center"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: current.width,
          height: current.height,
          opacity: current.bgOpacity,
        }}
        transition={{
          width: { type: "spring", stiffness: 300, damping: 25 },
          height: { type: "spring", stiffness: 300, damping: 25 },
          opacity: { duration: 0.2 },
        }}
      >
        <div className="w-full h-full rounded-full bg-white relative flex items-center justify-center">
          {cursorVariant === "label" && cursorLabel && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-[10px] tracking-[0.2em] uppercase text-black font-medium select-none"
            >
              {cursorLabel}
            </motion.span>
          )}
        </div>
      </motion.div>

      {/* Outer ring follower (subtle) */}
      <motion.div
        className="fixed top-0 left-0 z-[9997] pointer-events-none hidden md:block"
        style={{
          x: useSpring(mouseX, { damping: 40, stiffness: 150 }),
          y: useSpring(mouseY, { damping: 40, stiffness: 150 }),
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: cursorVariant === "default" ? 32 : 0,
          height: cursorVariant === "default" ? 32 : 0,
          opacity: cursorVariant === "default" ? 0.3 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
      >
        <div className="w-full h-full rounded-full border border-white mix-blend-difference" />
      </motion.div>
    </>
  );
}
