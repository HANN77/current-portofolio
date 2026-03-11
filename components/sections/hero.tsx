"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";
import Magnetic from "../animations/magnetic";
import { usePortfolioStore } from "@/lib/store";
import { ArrowDown } from "lucide-react";

gsap.registerPlugin(useGSAP);

const Scene3D = dynamic(() => import("../animations/scene-3d"), {
  ssr: false,
  loading: () => <div className="absolute inset-0" />,
});

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 3.2 });

    // Heading words reveal
    const words = headingRef.current?.querySelectorAll(".word");
    if (words) {
      tl.fromTo(
        words,
        { y: 120, opacity: 0, rotateX: -80 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.08, ease: "power4.out" }
      );
    }

    // Decorative line
    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, ease: "power3.inOut" },
      "-=0.6"
    );

    // Subtitle
    tl.fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0, filter: "blur(10px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power3.out" },
      "-=0.5"
    );

    // CTA
    tl.fromTo(
      ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    );
  }, { scope: sectionRef });

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="gradient-orb gradient-orb-1 absolute top-[10%] left-[15%]" />
        <div className="gradient-orb gradient-orb-2 absolute top-[60%] right-[10%]" />
        <div className="gradient-orb gradient-orb-3 absolute bottom-[20%] left-[50%]" />
      </div>

      {/* 3D Background */}
      <Scene3D className="opacity-50" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl px-6">
        {/* Overline */}
        <div className="mb-8 overflow-hidden">
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 3, duration: 0.8 }}
            className="text-xs tracking-[0.5em] text-muted-foreground uppercase"
          >
            Creative Developer & Designer
          </motion.p>
        </div>

        {/* Main heading */}
        <div ref={headingRef} style={{ perspective: "1000px" }}>
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-extralight tracking-tight leading-[1.1]">
            {["Crafting", "Digital", "Experiences"].map((word, i) => (
              <span
                key={i}
                className="word inline-block mr-[0.25em] opacity-0 origin-bottom"
                style={{ willChange: "transform, opacity" }}
              >
                {word}
              </span>
            ))}
          </h1>
        </div>

        {/* Line */}
        <div
          ref={lineRef}
          className="w-20 h-[1px] bg-foreground/20 mx-auto my-8 origin-left"
          style={{ transform: "scaleX(0)" }}
        />

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed opacity-0"
        >
          Building beautiful, performant, and accessible web experiences
          with modern technologies and meticulous attention to detail.
        </p>

        {/* CTA */}
        <div ref={ctaRef} className="mt-12 opacity-0">
          <Magnetic strength={0.2}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToAbout}
              className="px-8 py-4 border border-foreground/15 text-sm tracking-[0.2em] uppercase text-foreground hover:bg-foreground hover:text-[var(--background)] transition-colors duration-500 rounded-full bg-[var(--surface-elevated)]/50 backdrop-blur-sm"
              data-cursor="pointer"
              onMouseEnter={() => usePortfolioStore.getState().setCursorVariant("pointer")}
              onMouseLeave={() => usePortfolioStore.getState().setCursorVariant("default")}
            >
              Explore My Work
            </motion.button>
          </Magnetic>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted-foreground/50 cursor-pointer"
          onClick={scrollToAbout}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <ArrowDown size={14} strokeWidth={1} />
        </motion.div>
      </motion.div>
    </section>
  );
}
