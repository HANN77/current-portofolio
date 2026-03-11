"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence } from "motion/react";
import Reveal from "../animations/reveal";
import TextReveal from "../animations/text-reveal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, FileText, Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const workHistory = [
  {
    role: "Senior Frontend Engineer",
    company: "Tech Corp",
    period: "2023 — Present",
    description: "Leading the frontend architecture for a SaaS platform serving 100K+ users.",
  },
  {
    role: "Full Stack Developer",
    company: "Digital Agency",
    period: "2021 — 2023",
    description: "Built custom web applications and e-commerce solutions for various clients.",
  },
  {
    role: "Junior Developer",
    company: "Startup Inc",
    period: "2020 — 2021",
    description: "Developed React applications and contributed to the design system.",
  },
];

const journals = [
  {
    title: "Building Accessible Web Components",
    date: "Feb 2025",
    excerpt: "Exploring best practices for creating inclusive and accessible user interfaces.",
    category: "Development",
  },
  {
    title: "The Future of Web Animation",
    date: "Jan 2025",
    excerpt: "How GSAP, Motion, and WebGL are shaping the next era of web experiences.",
    category: "Design",
  },
  {
    title: "Optimizing React Performance",
    date: "Dec 2024",
    excerpt: "Deep dive into React 19 performance patterns and server components.",
    category: "Development",
  },
];

const certifications = [
  {
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2025",
    credentialId: "AWS-SAA-C03",
  },
  {
    name: "Google Professional Cloud Developer",
    issuer: "Google Cloud",
    date: "2024",
    credentialId: "GCP-PCD-2024",
  },
  {
    name: "Meta Frontend Developer Certificate",
    issuer: "Meta",
    date: "2024",
    credentialId: "META-FED-2024",
  },
  {
    name: "Certified Kubernetes Administrator",
    issuer: "CNCF",
    date: "2023",
    credentialId: "CKA-2023",
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Timeline line draw
    const line = timelineRef.current?.querySelector(".timeline-line-fill");
    if (line) {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 1,
          },
        }
      );
    }

    // Timeline items stagger
    const items = timelineRef.current?.querySelectorAll(".timeline-item");
    if (items) {
      gsap.fromTo(
        items,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="experience" className="py-32 px-6 md:px-12 section-warm">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="text-xs tracking-[0.5em] text-muted-foreground uppercase mb-4">
            Background
          </p>
        </Reveal>

        <TextReveal
          text="My journey and credentials"
          as="h2"
          className="text-3xl md:text-5xl font-extralight tracking-tight leading-[1.2] mb-16"
        />

        <Reveal delay={0.2}>
          <Tabs defaultValue="work" className="w-full !flex !flex-col">
            <TabsList variant="line" className="!flex !flex-row !h-auto !w-full justify-start gap-0 p-0 mb-12 bg-transparent border-b border-[var(--warm-300)] rounded-none">
              <TabsTrigger
                value="work"
                className="!flex-none px-6 py-3 text-sm tracking-wider"
              >
                <Briefcase size={14} className="mr-2" />
                Work History
              </TabsTrigger>
              <TabsTrigger
                value="journal"
                className="!flex-none px-6 py-3 text-sm tracking-wider"
              >
                <FileText size={14} className="mr-2" />
                Journal
              </TabsTrigger>
              <TabsTrigger
                value="certifications"
                className="!flex-none px-6 py-3 text-sm tracking-wider"
              >
                <Award size={14} className="mr-2" />
                Certifications
              </TabsTrigger>
            </TabsList>

            {/* Work History Tab */}
            <TabsContent value="work" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div ref={timelineRef} className="relative pl-8 md:pl-12">
                  {/* Timeline line */}
                  <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-border/50">
                    <div className="timeline-line-fill absolute inset-0 bg-foreground/30 origin-top" />
                  </div>

                  {workHistory.map((item, i) => (
                    <div key={i} className="timeline-item relative pb-12 last:pb-0 opacity-0">
                      {/* Dot */}
                      <div className="absolute -left-8 md:-left-12 top-1 w-2 h-2 rounded-full bg-foreground/30 ring-4 ring-[var(--warm-100)]" />

                      <div className="mb-1">
                        <span className="text-xs tracking-wider text-muted-foreground uppercase">
                          {item.period}
                        </span>
                      </div>
                      <h3 className="text-xl font-light mb-1">{item.role}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{item.company}</p>
                      <p className="text-sm text-muted-foreground/80 font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            {/* Journal Tab */}
            <TabsContent value="journal" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {journals.map((article, i) => (
                  <motion.div
                    key={article.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                  >
                    <Card className="group border-border/50 hover:shadow-lg transition-all duration-500 cursor-pointer h-full">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <Badge variant="secondary" className="text-[10px] tracking-wider font-light">
                            {article.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground/60">{article.date}</span>
                        </div>
                        <h3 className="text-lg font-light mb-3 group-hover:text-foreground transition-colors leading-snug">
                          {article.title}
                        </h3>
                        <p className="text-sm text-muted-foreground font-light leading-relaxed">
                          {article.excerpt}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            {/* Certifications Tab */}
            <TabsContent value="certifications" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {certifications.map((cert, i) => (
                  <motion.div
                    key={cert.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.06)" }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <Card className="border-border/50 overflow-hidden cursor-pointer h-full">
                        <CardContent className="p-6 flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--warm-200)] to-[var(--warm-300)] flex items-center justify-center flex-shrink-0">
                            <Award size={20} className="text-muted-foreground" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-base font-light mb-1">{cert.name}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{cert.issuer}</p>
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-muted-foreground/60">{cert.date}</span>
                              <span className="text-xs text-muted-foreground/40">•</span>
                              <span className="text-xs text-muted-foreground/60 font-mono">
                                {cert.credentialId}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </Reveal>
      </div>
    </section>
  );
}
