"use client";

import { useLayoutEffect } from "react";

export default function ScrollToTopOnLoad() {
  useLayoutEffect(() => {
    // Disable browser scroll restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Always start from the Hero
    window.scrollTo(0, 0);
  }, []);

  return null;
}

