"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import SmoothScroll from "@/components/animations/smooth-scroll";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Projects from "@/components/sections/projects";
import Skills from "@/components/sections/skills";
import Experience from "@/components/sections/experience";
import Contact from "@/components/sections/contact";

const Preloader = dynamic(() => import("@/components/preloader"), {
  ssr: false,
});

const CustomCursor = dynamic(
  () => import("@/components/animations/custom-cursor"),
  { ssr: false }
);

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <SmoothScroll>
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Preloader */}
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}

      {/* Main Content */}
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
