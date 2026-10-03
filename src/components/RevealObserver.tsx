"use client";

import { useEffect } from "react";

// Reveals [data-reveal] elements as they scroll into view, including ones added later by client components.
// Elements already on screen are shown straight away, so nothing above the fold flickers.
export default function RevealObserver() {
  useEffect(() => {
    const showAll = () => document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => el.classList.add("is-visible"));
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      showAll();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    const watch = (root: ParentNode) => {
      const els = root.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)");
      for (const el of els) {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add("is-visible");
        else io.observe(el);
      }
    };
    watch(document);
    document.documentElement.classList.add("reveal-ready");

    // A fast flick can carry an element from below the screen to above it between two observer checks.
    // Anything the visitor has already scrolled past is revealed too.
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)").forEach((el) => {
          if (el.getBoundingClientRect().top < window.innerHeight) {
            el.classList.add("is-visible");
            io.unobserve(el);
          }
        });
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Content rendered later (tool results, menus) gets the same treatment.
    const mo = new MutationObserver((records) => {
      for (const rec of records) {
        rec.addedNodes.forEach((n) => {
          if (!(n instanceof HTMLElement)) return;
          if (n.matches("[data-reveal]:not(.is-visible)")) watch(n.parentElement ?? document);
          else watch(n);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}
