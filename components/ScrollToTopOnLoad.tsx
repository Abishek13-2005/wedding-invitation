"use client";

import { useEffect, useLayoutEffect } from "react";

export default function ScrollToTopOnLoad() {
  useLayoutEffect(() => {
    // Tell the browser NOT to restore the previous scroll position
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Force Hero position immediately
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  useEffect(() => {
    const goToHero = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });

      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Immediately
    goToHero();

    // After browser restoration
    const timer1 = window.setTimeout(goToHero, 50);
    const timer2 = window.setTimeout(goToHero, 150);
    const timer3 = window.setTimeout(goToHero, 300);
    const timer4 = window.setTimeout(goToHero, 600);
    const timer5 = window.setTimeout(goToHero, 1000);

    // Safari bfcache / pageshow
    window.addEventListener(
      "pageshow",
      goToHero,
    );

    return () => {
      window.clearTimeout(timer1);
      window.clearTimeout(timer2);
      window.clearTimeout(timer3);
      window.clearTimeout(timer4);
      window.clearTimeout(timer5);

      window.removeEventListener(
        "pageshow",
        goToHero,
      );
    };
  }, []);

  return null;
}