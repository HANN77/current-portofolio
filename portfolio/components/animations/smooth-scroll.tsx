"use client";

import { useEffect, useState, createContext, useContext } from "react";
import Lenis from "lenis";

const SmoothScrollContext = createContext<Lenis | null>(null);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    /* eslint-disable */
    setLenisInstance(lenis);
    /* eslint-enable */

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={lenisInstance}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

export function useLenis() {
  return useContext(SmoothScrollContext);
}
