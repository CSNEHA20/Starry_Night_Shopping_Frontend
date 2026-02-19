/**
 * Centralized GSAP configuration
 * This file ensures GSAP plugins are registered only once
 * Import this file instead of registering plugins individually
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins once
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Export configured instances
export { gsap, ScrollTrigger };
export default gsap;
