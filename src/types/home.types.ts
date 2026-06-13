export interface OrbConfig {
    id: string;
    icon: string;
    label: string;
    subLabel: string;
    size: OrbSize;
    /** Resting X position as % of container width  (0–100) */
    x: number;
    /** Resting Y position as % of container height (0–100) */
    y: number;
    /** Vertical float bob amplitude in px */
    floatAmp: number;
    /** Float cycle duration in seconds */
    floatSpeed: number;
    /** Phase offset in radians so orbs bob independently */
    floatOffset: number;
}

export type OrbSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface HeroTagline {
    id: string;
    label: string;
}