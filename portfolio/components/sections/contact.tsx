"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import Reveal from "../animations/reveal";
import TextReveal from "../animations/text-reveal";
import Magnetic from "../animations/magnetic";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { usePortfolioStore } from "@/lib/store";
import { Github, Linkedin, Twitter, Mail, Send, ArrowUpRight } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Mail, href: "mailto:hello@example.com", label: "Email" },
];

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to send message");
      
      if (formRef.current) formRef.current.reset();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="text-xs tracking-[0.5em] text-muted-foreground uppercase mb-4">
            Get In Touch
          </p>
        </Reveal>

        <TextReveal
          text="Let's work together"
          as="h2"
          className="text-3xl md:text-5xl font-extralight tracking-tight leading-[1.2] mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left - Info */}
          <div>
            <Reveal delay={0.1}>
              <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
                Have a project in mind or want to collaborate? Feel free to reach out.
                I&apos;m always open to discussing new opportunities and creative ideas.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mb-8">
                <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-3">
                  Email
                </p>
                <a
                  href="mailto:hello@example.com"
                  className="text-lg font-light hover:text-muted-foreground transition-colors group inline-flex items-center gap-2"
                >
                  hello@example.com
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mb-8">
                <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-3">
                  Location
                </p>
                <p className="text-lg font-light">San Francisco, CA</p>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div>
                <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-4">
                  Social
                </p>
                <div className="flex gap-4">
                  {socialLinks.map((link) => (
                    <Magnetic key={link.label} strength={0.3}>
                      <motion.a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 rounded-full border border-[var(--warm-300)] flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors duration-300"
                        data-cursor="pointer"
                        onMouseEnter={() => usePortfolioStore.getState().setCursorVariant("pointer")}
                        onMouseLeave={() => usePortfolioStore.getState().setCursorVariant("default")}
                        aria-label={link.label}
                      >
                        <link.icon size={16} strokeWidth={1.5} />
                      </motion.a>
                    </Magnetic>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right - Form */}
          <Reveal direction="right" delay={0.2}>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <label className="text-xs tracking-[0.2em] text-muted-foreground uppercase block mb-2">
                  Name
                </label>
                <Input
                  name="name"
                  placeholder="Your name"
                  className="bg-transparent border-[var(--warm-300)] focus:border-foreground/30 rounded-lg h-12 text-sm font-light transition-colors duration-300"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <label className="text-xs tracking-[0.2em] text-muted-foreground uppercase block mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  className="bg-transparent border-border/50 focus:border-foreground/30 rounded-lg h-12 text-sm font-light transition-colors duration-300"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <label className="text-xs tracking-[0.2em] text-muted-foreground uppercase block mb-2">
                  Message
                </label>
                <Textarea
                  name="message"
                  placeholder="Tell me about your project..."
                  rows={5}
                  className="bg-transparent border-[var(--warm-300)] focus:border-foreground/30 rounded-lg text-sm font-light resize-none transition-colors duration-300"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <Magnetic strength={0.15}>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 rounded-full bg-foreground text-background hover:bg-foreground/90 text-sm tracking-[0.2em] uppercase transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      >
                        <Send size={14} />
                      </motion.div>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send Message
                        <Send size={14} />
                      </span>
                    )}
                  </Button>
                </Magnetic>
              </motion.div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
