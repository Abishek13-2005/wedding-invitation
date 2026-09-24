"use client";

import { useLayoutEffect } from "react";

export default function ScrollToTopOnLoad() {
  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Force the page to start at the Hero
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });

    // Safari can restore scroll position after the first render,
    // so force it again on the next frame.
    const frame = window.requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}