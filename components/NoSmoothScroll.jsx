"use client";

import { useEffect } from "react";

export default function NoSmoothScroll() {
  useEffect(() => {
    const selector = 'a[href="#features"], a[href="#how-it-works"]';

    const handler = (e) => {
      // only handle normal left-clicks without modifier keys
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      const href = e.currentTarget.getAttribute("href") || "";
      const id = href.startsWith("#") ? href.slice(1) : href;
      const target = document.getElementById(id);
      if (target) {
        // perform instant (non-smooth) scroll
        target.scrollIntoView({ behavior: "auto", block: "start" });
        // update the URL hash without triggering another scroll
        history.pushState(null, "", `#${id}`);
      } else {
        // fallback: set hash
        location.hash = `#${id}`;
      }
    };

    const attach = () => {
      document.querySelectorAll(selector).forEach((el) => {
        el.removeEventListener("click", handler);
        el.addEventListener("click", handler);
      });
    };

    attach();

    // Watch for DOM changes so dynamically rendered anchors (Next/Clerk) are handled
    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.querySelectorAll(selector).forEach((el) => el.removeEventListener("click", handler));
      observer.disconnect();
    };
  }, []);

  return null;
}
