"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      syncTouch: true,
    });

    const handleScrollToTop = () => {
      lenis.scrollTo(0, {
        immediate: true,
      });

      window.scrollTo(0, 0);
    };

    // Always start at Hero when the page loads/refeshes
    handleScrollToTop();

    const frame = requestAnimationFrame(() => {
      handleScrollToTop();
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const animationFrame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(animationFrame);
      lenis.destroy();
    };
  }, []);

  return null;
}