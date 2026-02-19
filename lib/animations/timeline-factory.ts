import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import { ANIMATION_EASE } from '@/lib/constants';

/**
 * Create a hero intro timeline
 * Staggered text reveals with smooth easing
 */
export const createHeroTimeline = () => {
    const tl = gsap.timeline({ paused: true });

    tl.from('.hero-title', {
        opacity: 0,
        y: 100,
        duration: 1.2,
        ease: ANIMATION_EASE.POWER4_OUT,
    })
        .from(
            '.hero-subtitle',
            {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: ANIMATION_EASE.POWER4_OUT,
            },
            '-=0.6'
        )
        .from(
            '.hero-cta',
            {
                opacity: 0,
                scale: 0.8,
                duration: 0.8,
                stagger: 0.2,
                ease: ANIMATION_EASE.POWER4_OUT,
            },
            '-=0.4'
        );

    return tl;
};

/**
 * Create a scroll-triggered timeline
 * @param trigger - CSS selector for trigger element
 * @param options - ScrollTrigger options
 */
export const createScrollTimeline = (
    trigger: string,
    options?: gsap.plugins.ScrollTriggerInstanceVars
) => {
    return gsap.timeline({
        scrollTrigger: {
            trigger,
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
            markers: false,
            ...options,
        },
    });
};

/**
 * Create a staggered reveal animation
 * @param selector - CSS selector for elements
 * @param options - Animation options
 */
export const createStaggerReveal = (
    selector: string,
    options?: {
        delay?: number;
        stagger?: number;
        y?: number;
        duration?: number;
    }
) => {
    const { delay = 0, stagger = 0.1, y = 50, duration = 0.8 } = options || {};

    return gsap.from(selector, {
        opacity: 0,
        y,
        duration,
        stagger,
        delay,
        ease: ANIMATION_EASE.POWER4_OUT,
        scrollTrigger: {
            trigger: selector,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
        },
    });
};

/**
 * Create a parallax effect
 * @param selector - CSS selector for element
 * @param speed - Parallax speed (0-1, lower is slower)
 */
export const createParallax = (selector: string, speed: number = 0.5) => {
    return gsap.to(selector, {
        y: () => window.innerHeight * speed,
        ease: 'none',
        scrollTrigger: {
            trigger: selector,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
        },
    });
};

/**
 * Create a horizontal scroll section
 * @param container - Container selector
 * @param items - Items selector
 */
export const createHorizontalScroll = (
    container: string,
    items: string
) => {
    const sections = gsap.utils.toArray(items);

    return gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: 'none',
        scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: 1,
            snap: 1 / (sections.length - 1),
            end: () => `+=${document.querySelector(container)?.scrollWidth}`,
        },
    });
};

/**
 * Kill all ScrollTriggers and animations
 * Use on route change
 */
export const killAllAnimations = () => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    gsap.killTweensOf('*');
};

/**
 * Refresh ScrollTrigger
 * Use after DOM changes
 */
export const refreshScrollTrigger = () => {
    ScrollTrigger.refresh();
};
