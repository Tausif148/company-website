import { useCallback } from 'react';

/**
 * Returns an onMouseMove handler to attach to any glass orb element.
 * Updates --mouse-x / --mouse-y CSS vars relative to the element's bounds,
 * driving the radial-gradient highlight in .glass-orb:hover.
 */
export function useMouseGlow() {
    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            const el = e.currentTarget;
            const rect = el.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            el.style.setProperty('--mouse-x', `${x}%`);
            el.style.setProperty('--mouse-y', `${y}%`);
        },
        []
    );

    return { handleMouseMove };
}