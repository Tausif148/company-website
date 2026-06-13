import { useEffect } from "react";

/**
 * useReveal hook
 * Applies a scroll reveal animation by adding the `active` class to elements with the `reveal`
 * class when they intersect the viewport, and removes it when they exit.
 */
export const useReveal = () => {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          } else {
            entry.target.classList.remove("active");
          }
        });
      },
      {
        threshold: 0.15,
      },
    );

    elements.forEach((el) => observer.observe(el));

    // Cleanup on unmount
    return () => {
      observer.disconnect();
    };
  }, []);
};