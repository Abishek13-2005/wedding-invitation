"use client";

import { useLayoutEffect } from "react";

export default function ScrollToTopOnLoad() {
  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const goToHero = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    };

    // Immediately move to the top
    goToHero();

    // Run again after the browser has finished restoring its position
    const frame1 = requestAnimationFrame(() => {
      goToHero();

      requestAnimationFrame(() => {
        goToHero();
      });
    });

    // Handle Safari/iPhone page restoration
    const handlePageShow = () => {
      goToHero();
    };

    window.addEventListener(
      "pageshow",
      handlePageShow,
    );

    return () => {
      cancelAnimationFrame(frame1);

      window.removeEventListener(
        "pageshow",
        handlePageShow,
      );
    };
  }, []);

  return null;
}