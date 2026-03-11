"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import Reveal from "../animations/reveal";
import TextReveal from "../animations/text-reveal";
import { Badge } from "@/components/ui/badge";
import { usePortfolioStore } from "@/lib/store";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const categories = ["All", "Web", "Mobile", "Design"];

const projects = [
  {
    title: "E-Commerce Platform",
    description: "A modern e-commerce experience with seamless checkout flow and real-time inventory.",
    category: "Web",
    tags: ["Next.js", "Stripe", "PostgreSQL"],
    year: "2025",
    color: "#ede9e3",
  },
  {
    title: "Finance Dashboard",
    description: "Real-time financial analytics dashboard with interactive charts.",
    category: "Web",
    tags: ["React", "D3.js", "Node.js"],
    year: "2025",
    color: "#e0e7d8",
  },
  {
    title: "Health & Wellness App",
    description: "Mobile application for tracking health metrics with AI-powered insights.",
    category: "Mobile",
    tags: ["React Native", "TensorFlow", "Firebase"],
    year: "2024",
    color: "#e4dff0",
  },
  {
    title: "Brand Identity System",
    description: "Complete brand identity including logo, typography, and guidelines.",
    category: "Design",
    tags: ["Figma", "Illustrator", "Brand"],
    year: "2024",
    color: "#f0ede6",
  },
  {
    title: "SaaS Management Tool",
    description: "Project management platform with real-time collaboration.",
    category: "Web",
    tags: ["Next.js", "Prisma", "WebSocket"],
    year: "2024",
    color: "#e8e4dc",
  },
  {
    title: "Social Media App",
    description: "Cross-platform social application with real-time messaging.",
    category: "Mobile",
    tags: ["Flutter", "Supabase", "WebRTC"],
    year: "2023",
    color: "#dfe8e3",
  },
];

function ProjectRow({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const { setCursorVariant, setCursorLabel } = usePortfolioStore();
  const imgX = useMotionValue(0);
  const imgY = useMotionValue(0);
  const springX = useSpring(imgX, { stiffness: 150, damping: 20 });
  const springY = useSpring(imgY, { stiffness: 150, damping: 20 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    imgX.set(e.clientX - rect.left - 160);
    imgY.set(e.clientY - rect.top - 100);
  };

  return (
    <motion.div
      className="group relative border-b border-[var(--warm-300)] py-6 md:py-8 px-2 flex items-center justify-between cursor-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsHovered(true);
        setCursorVariant("label");
        setCursorLabel("View");
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setCursorVariant("default");
        setCursorLabel("");
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
    >
      {/* Number */}
      <span className="text-xs text-muted-foreground/40 tracking-wider w-12 font-mono">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Title */}
      <div className="flex-1">
        <h3 className="text-2xl md:text-4xl font-extralight tracking-tight group-hover:translate-x-3 transition-transform duration-500">
          {project.title}
        </h3>
      </div>

      {/* Tags */}
      <div className="hidden md:flex items-center gap-2 mr-8">
        {project.tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="text-[10px] tracking-wider font-light bg-[var(--warm-200)] border-0"
          >
            {tag}
          </Badge>
        ))}
      </div>

      {/* Category + Year */}
      <div className="text-right">
        <p className="text-xs text-muted-foreground tracking-wider">{project.category}</p>
        <p className="text-xs text-muted-foreground/50">{project.year}</p>
      </div>

      {/* Floating preview image */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute z-20 pointer-events-none w-[320px] h-[200px] rounded-xl overflow-hidden shadow-2xl"
            style={{ x: springX, y: springY }}
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${project.color}, #f8f7f4)` }}
            >
              <span className="text-lg font-extralight text-foreground/30 tracking-wider">
                {project.title}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-32 px-6 md:px-12 section-elevated"
    >
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="text-xs tracking-[0.5em] text-muted-foreground uppercase mb-4">
            Selected Work
          </p>
        </Reveal>

        <TextReveal
          text="Projects that define my craft"
          as="h2"
          className="text-3xl md:text-5xl font-extralight tracking-tight leading-[1.2] mb-12"
        />

        {/* Filter Tabs */}
        <Reveal delay={0.2}>
          <div className="flex gap-6 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`relative text-sm tracking-wider pb-2 transition-colors duration-300 ${
                  activeFilter === cat
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
                data-cursor="pointer"
                onMouseEnter={() =>
                  usePortfolioStore.getState().setCursorVariant("pointer")
                }
                onMouseLeave={() =>
                  usePortfolioStore.getState().setCursorVariant("default")
                }
              >
                {cat}
                {activeFilter === cat && (
                  <motion.div
                    layoutId="filterLine"
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-foreground"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Project List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-[var(--warm-300)]"
          >
            {filteredProjects.map((project, i) => (
              <ProjectRow key={project.title} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
