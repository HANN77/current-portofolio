"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence } from "motion/react";
import { usePortfolioStore } from "@/lib/store";
import Magnetic from "./animations/magnetic";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

/* Letter-flip hover link */
function FlipLink({ children, onClick }: { children: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="relative overflow-hidden group h-5"
      data-cursor="pointer"
      onMouseEnter={() => usePortfolioStore.getState().setCursorVariant("pointer")}
      onMouseLeave={() => usePortfolioStore.getState().setCursorVariant("default")}
    >
      <span className="flex flex-col transition-transform duration-500 group-hover:-translate-y-1/2">
        <span className="text-sm tracking-wider text-muted-foreground group-hover:text-foreground transition-colors inline-block">
          {children}
        </span>
        <span className="text-sm tracking-wider text-foreground inline-block">
          {children}
        </span>
      </span>
    </button>
  );
}

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { activeSection, setActiveSection } = usePortfolioStore();

  // Track active section via ScrollTrigger
  useGSAP(() => {
    const sections = ["hero", "about", "projects", "skills", "experience", "contact"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      ScrollTrigger.create({
        trigger: el,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveSection(id),
        onEnterBack: () => setActiveSection(id),
      });
    });

    // Navbar entrance — staggered
    const tl = gsap.timeline({ delay: 3.2 });
    
    // Logo letter by letter
    const logoLetters = logoRef.current?.querySelectorAll(".logo-letter");
    if (logoLetters) {
      tl.fromTo(
        logoLetters,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.04, ease: "power3.out" }
      );
    }

    // Links stagger
    const links = linksRef.current?.querySelectorAll(".nav-link");
    if (links) {
      tl.fromTo(
        links,
        { y: -15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: "power3.out" },
        "-=0.3"
      );
    }
  }, { scope: navRef });

  // Scroll state
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const activeIndex = navLinks.findIndex((l) => l.href === `#${activeSection}`);
  const linkRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number } | null>(null);

  const updatePillPosition = useCallback(() => {
    if (activeIndex >= 0 && linkRefs.current[activeIndex]) {
      const el = linkRefs.current[activeIndex]!;
      setPillStyle({ left: el.offsetLeft, width: el.offsetWidth });
    } else {
      setPillStyle(null);
    }
  }, [activeIndex]);

  useEffect(() => {
    updatePillPosition();
  }, [updatePillPosition]);

  // Also recalculate on window resize in case layout shifts
  useEffect(() => {
    window.addEventListener("resize", updatePillPosition);
    return () => window.removeEventListener("resize", updatePillPosition);
  }, [updatePillPosition]);

  // Recalculate pill position after scrolled state changes (navbar layout shift)
  useEffect(() => {
    const timeout = setTimeout(() => {
      updatePillPosition();
    }, 550); // slightly longer than the 500ms navbar transition
    return () => clearTimeout(timeout);
  }, [scrolled, updatePillPosition]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none flex justify-center px-6">
        <motion.nav
          ref={navRef}
          layout
          className="pointer-events-auto overflow-hidden whitespace-nowrap origin-center"
          style={{
            width: scrolled ? "896px" : "100%", // 56rem = 896px, fixed value is more stable for spring layout
            maxWidth: "100%",
          }}
          animate={
            scrolled
              ? {
                  y: 16,
                  padding: "8px 24px",
                  backgroundColor: "#f8f7f4",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03)",
                  borderRadius: 999,
                }
              : {
                  y: 0,
                  padding: "24px 32px",
                  backgroundColor: "rgba(248, 247, 244, 0)",
                  boxShadow: "0 0px 0px rgba(0,0,0,0)",
                  borderRadius: 0,
                }
          }
          transition={{
            layout: { type: "spring", stiffness: 260, damping: 30 },
            default: { type: "spring", stiffness: 260, damping: 30 }
          }}
        >
          <div className="max-w-6xl mx-auto flex items-center justify-between w-full">
            {/* Logo - letter by letter */}
            <Magnetic strength={0.15}>
              <a
                ref={logoRef}
                href="#"
                className="text-base font-light tracking-[0.3em] uppercase text-foreground flex shrink-0"
                data-cursor="pointer"
                onMouseEnter={() => usePortfolioStore.getState().setCursorVariant("pointer")}
                onMouseLeave={() => usePortfolioStore.getState().setCursorVariant("default")}
              >
                {"Portfolio".split("").map((letter, i) => (
                  <span key={i} className="logo-letter opacity-0 inline-block">
                    {letter}
                  </span>
                ))}
              </a>
            </Magnetic>

            {/* Desktop Links with pill indicator */}
            <div ref={linksRef} className="hidden md:flex items-center gap-1 relative ml-auto">
              {/* Sliding pill — dynamically positioned */}
              {pillStyle && (
                <motion.div
                  className="absolute h-8 bg-foreground/[0.04] rounded-full"
                  layoutId="navPill"
                  style={{
                    left: `${pillStyle.left}px`,
                    width: `${pillStyle.width}px`,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 30,
                  }}
                />
              )}

              {navLinks.map((link, i) => (
                <div
                  key={link.name}
                  ref={(el) => { linkRefs.current[i] = el; }}
                  className="nav-link opacity-0 relative z-10 px-4 py-1.5"
                >
                  <FlipLink onClick={() => handleNavClick(link.href)}>
                    {link.name}
                  </FlipLink>
                </div>
              ))}
            </div>

            {/* Mobile Toggle - Animated hamburger */}
            <button
              className="md:hidden relative z-50 w-8 h-8 flex flex-col items-center justify-center gap-1.5 ml-auto shrink-0"
              onClick={() => setMobileOpen(!mobileOpen)}
              data-cursor="pointer"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                className="block w-6 h-[1.5px] bg-foreground origin-center"
                transition={{ duration: 0.3 }}
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                className="block w-6 h-[1.5px] bg-foreground"
                transition={{ duration: 0.2 }}
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="block w-6 h-[1.5px] bg-foreground origin-center"
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu - Full screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-[#f8f7f4] flex flex-col items-center justify-center gap-6"
          >
            {/* Decorative circle */}
            <motion.div
              className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-br from-[#ede9e3] to-[#e0e7d8] opacity-30 blur-3xl"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 10, repeat: Infinity }}
            />

            {navLinks.map((link, i) => (
              <motion.button
                key={link.name}
                initial={{ y: 40, opacity: 0, filter: "blur(10px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ delay: i * 0.08 + 0.2, ease: [0.76, 0, 0.24, 1] }}
                onClick={() => handleNavClick(link.href)}
                className="text-4xl font-extralight tracking-[0.2em] text-foreground hover:text-muted-foreground transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-foreground group-hover:w-full transition-all duration-500" />
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
