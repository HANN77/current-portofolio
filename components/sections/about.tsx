"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Reveal from "../animations/reveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const scrubText = `I'm a creative developer focused on building beautiful, functional, and user-centered digital experiences. With a keen eye for design and a passion for clean code, I bring ideas to life through thoughtful development. My approach combines technical expertise with creative problem-solving, ensuring every project is not only visually stunning but also performant and accessible. I believe that the best digital products are born from the intersection of art and engineering.`;

const stats = [
  { number: "5+", label: "Years Experience" },
  { number: "50+", label: "Projects Completed" },
  { number: "30+", label: "Happy Clients" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Text scrub: gray → black word by word
    const words = textRef.current?.querySelectorAll(".scrub-word");
    if (words) {
      gsap.fromTo(
        words,
        { color: "#d4cdc3", scale: 1 },
        {
          color: "#111111",
          scale: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 75%",
            end: "bottom 40%",
            scrub: 1,
          },
        }
      );
    }

    // Stats counter animation
    const counters = statsRef.current?.querySelectorAll(".stat-number");
    counters?.forEach((counter) => {
      const numericValue = parseInt(counter.getAttribute("data-value") || "0");
      gsap.fromTo(
        counter,
        { innerText: 0 },
        {
          innerText: numericValue,
          duration: 2,
          ease: "power2.out",
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: counter,
            start: "top 85%",
          },
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="about" className="py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <Reveal>
          <p className="text-xs tracking-[0.5em] text-muted-foreground uppercase mb-4">
            About Me
          </p>
        </Reveal>

        {/* Large scrub text */}
        <p
          ref={textRef}
          className="text-2xl md:text-4xl lg:text-5xl font-extralight leading-[1.4] md:leading-[1.3] tracking-tight mb-24"
        >
          {scrubText.split(" ").map((word, i) => (
            <span
              key={i}
              className="scrub-word inline-block mr-[0.3em] transition-colors"
              style={{ color: "#d4cdc3" }}
            >
              {word}
            </span>
          ))}
        </p>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-3 gap-8 max-w-xl">
          {stats.map((stat) => (
            <Reveal key={stat.label} delay={0.2}>
              <div>
                <div className="text-4xl md:text-5xl font-extralight text-foreground mb-2">
                  <span
                    className="stat-number"
                    data-value={parseInt(stat.number)}
                  >
                    0
                  </span>
                  {stat.number.includes("+") && "+"}
                </div>
                <p className="text-xs tracking-wider text-muted-foreground uppercase">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
