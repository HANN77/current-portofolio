"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";
import Magnetic from "./animations/magnetic";
import { usePortfolioStore } from "@/lib/store";
import { Github, Linkedin, Twitter } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const socials = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        },
      }
    );
  }, { scope: footerRef });

  return (
    <footer
      ref={footerRef}
      className="py-12 px-6 md:px-12 border-t border-[var(--warm-300)] opacity-0"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-xs tracking-wider text-muted-foreground">
          © {new Date().getFullYear()} Portfolio. All rights reserved.
        </p>

        <div className="flex items-center gap-4">
          {socials.map((social) => (
            <Magnetic key={social.label} strength={0.3}>
              <motion.a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full border border-[var(--warm-300)] flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all duration-300"
                aria-label={social.label}
                data-cursor="pointer"
                onMouseEnter={() => usePortfolioStore.getState().setCursorVariant("pointer")}
                onMouseLeave={() => usePortfolioStore.getState().setCursorVariant("default")}
              >
                <social.icon size={14} strokeWidth={1.5} />
              </motion.a>
            </Magnetic>
          ))}
        </div>

        <p className="text-xs tracking-wider text-muted-foreground/50">
          Built with Next.js, GSAP & Motion
        </p>
      </div>
    </footer>
  );
}
