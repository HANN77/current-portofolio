"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";
import Reveal from "../animations/reveal";
import TextReveal from "../animations/text-reveal";
import Marquee from "../animations/marquee";
import { usePortfolioStore } from "@/lib/store";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const skillsRow1 = [
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "TypeScript", icon: "TS" },
  { name: "Node.js", icon: "⬢" },
  { name: "Python", icon: "🐍" },
  { name: "Figma", icon: "🎨" },
];

const skillsRow2 = [
  { name: "PostgreSQL", icon: "🐘" },
  { name: "Docker", icon: "🐳" },
  { name: "AWS", icon: "☁️" },
  { name: "GraphQL", icon: "◈" },
  { name: "Tailwind", icon: "💨" },
  { name: "Git", icon: "⎇" },
  { name: "Redis", icon: "🔴" },
  { name: "Prisma", icon: "△" },
];

function SkillPill({ name, icon }: { name: string; icon: string }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.15,
        boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="inline-flex items-center gap-3 px-6 py-3 mx-3 rounded-full border border-[var(--warm-300)] bg-[var(--surface-elevated)] hover:bg-white select-none"
      style={{ transform: `rotate(${(Math.random() - 0.5) * 4}deg)` }}
      data-cursor="pointer"
      onMouseEnter={() => usePortfolioStore.getState().setCursorVariant("pointer")}
      onMouseLeave={() => usePortfolioStore.getState().setCursorVariant("default")}
    >
      <span className="text-xl">{icon}</span>
      <span className="text-sm tracking-wider text-foreground/80 font-light whitespace-nowrap">
        {name}
      </span>
    </motion.div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Parallax — rows shift at different speeds
    gsap.to(row1Ref.current, {
      xPercent: -5,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    gsap.to(row2Ref.current, {
      xPercent: 5,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-32 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 mb-16">
        <Reveal>
          <p className="text-xs tracking-[0.5em] text-muted-foreground uppercase mb-4">
            Expertise
          </p>
        </Reveal>

        <TextReveal
          text="Technologies I work with"
          as="h2"
          className="text-3xl md:text-5xl font-extralight tracking-tight leading-[1.2]"
        />
      </div>

      {/* Row 1 — scrolls left */}
      <div ref={row1Ref} className="mb-4">
        <Marquee direction="left" speed={35} pauseOnHover>
          {skillsRow1.map((skill) => (
            <SkillPill key={skill.name} {...skill} />
          ))}
        </Marquee>
      </div>

      {/* Row 2 — scrolls right */}
      <div ref={row2Ref}>
        <Marquee direction="right" speed={40} pauseOnHover>
          {skillsRow2.map((skill) => (
            <SkillPill key={skill.name} {...skill} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
