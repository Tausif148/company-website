// hooks/useOrbit.ts

import { useEffect } from "react";

export const useOrbit = () => {
  useEffect(() => {
    const items = document.querySelectorAll(".orbit-item");

    let angle = 0;

    const animate = () => {
      angle += 0.005;

      items.forEach((item: any) => {
        const radius = Number(item.dataset.orbitRadius);
        const offset = Number(item.dataset.orbitOffset);

        const x = Math.cos(angle + offset) * radius;
        const y = Math.sin(angle + offset) * radius;

        item.style.transform = `translate(${x}px, ${y}px)`;
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);
};