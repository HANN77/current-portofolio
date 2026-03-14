"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion } from "motion/react";

gsap.registerPlugin(useGSAP);

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const overlayTopRef = useRef<HTMLDivElement>(null);
  const overlayBottomRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        setTimeout(onComplete, 300);
      },
    });

    // Counter animation 0 -> 100
    tl.to(counterRef.current, {
      innerText: 100,
      duration: 2.5,
      ease: "power2.inOut",
      snap: { innerText: 1 },
      onUpdate: function () {
        if (counterRef.current) {
          counterRef.current.textContent = Math.round(
            Number(gsap.getProperty(counterRef.current, "innerText"))
          ).toString();
        }
      },
    });

    // Name blur reveal
    tl.fromTo(
      nameRef.current,
      { filter: "blur(20px)", opacity: 0, scale: 0.9 },
      { filter: "blur(0px)", opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
      0.5
    );

    // Wait a moment
    tl.to({}, { duration: 0.3 });

    // Curtain wipe - split reveal
    tl.to(
      overlayTopRef.current,
      { yPercent: -100, duration: 1, ease: "power4.inOut" },
      "curtain"
    );

    tl.to(
      overlayBottomRef.current,
      { yPercent: 100, duration: 1, ease: "power4.inOut" },
      "curtain"
    );

    // Fade out content
    tl.to(
      [counterRef.current, nameRef.current],
      { opacity: 0, duration: 0.3, ease: "power2.in" },
      "curtain-=0.1"
    );
  }, { scope: containerRef });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-[100] pointer-events-auto"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Top curtain */}
          <div
            ref={overlayTopRef}
            className="absolute top-0 left-0 w-full h-1/2 bg-[#f8f7f4]"
            style={{ zIndex: 2 }}
          />
          {/* Bottom curtain */}
          <div
            ref={overlayBottomRef}
            className="absolute bottom-0 left-0 w-full h-1/2 bg-[#f8f7f4]"
            style={{ zIndex: 2 }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full bg-[#f8f7f4]">
            {/* Decorative orb */}
            <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#ede9e3] via-[#e0e7d8] to-[#e4dff0] opacity-20 blur-3xl animate-pulse" />

            {/* Counter */}
            <div className="absolute top-8 right-8">
              <span
                ref={counterRef}
                className="text-7xl md:text-9xl font-extralight text-[#111]/8 tabular-nums"
              >
                0
              </span>
            </div>

            {/* Name / Logo */}
            <div ref={nameRef} className="text-center opacity-0">
              <h1 className="text-4xl md:text-6xl font-light tracking-[0.3em] text-[#111] uppercase">
                Portfolio
              </h1>
              <div className="mt-4 w-12 h-[1px] bg-[#111]/20 mx-auto" />
              <p className="mt-4 text-sm tracking-[0.5em] text-[#111]/30 uppercase">
                Loading Experience
              </p>
            </div>

            {/* Progress bar */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-[var(--warm-300)] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[var(--warm-400)] to-[#111]/40 w-0 origin-left"
                style={{ animation: "progressFill 2.5s ease-in-out forwards" }}
              />
            </div>
          </div>

          <style jsx>{`
            @keyframes progressFill {
              from { width: 0%; }
              to { width: 100%; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
