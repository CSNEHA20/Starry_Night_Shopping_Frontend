import { useEffect, useRef, useCallback } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';

interface UseScrollAnimationOptions {
    trigger: string;
    start?: string;
    end?: string;
    scrub?: boolean | number;
    markers?: boolean;
    onEnter?: () => void;
    onLeave?: () => void;
    onEnterBack?: () => void;
    onLeaveBack?: () => void;
}

/**
 * Hook for creating scroll-triggered animations
 */
export const useScrollAnimation = (
    animation: (tl: gsap.core.Timeline) => void,
    options: UseScrollAnimationOptions
) => {
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: options.trigger,
                start: options.start || 'top center',
                end: options.end || 'bottom center',
                scrub: options.scrub ?? 1,
                markers: options.markers ?? false,
                onEnter: options.onEnter,
                onLeave: options.onLeave,
                onEnterBack: options.onEnterBack,
                onLeaveBack: options.onLeaveBack,
            },
        });

        animation(tl);
        timelineRef.current = tl;

        return () => {
            tl.kill();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options.trigger, options.start, options.end, options.scrub, options.markers]);

    return timelineRef;
};

/**
 * Hook for parallax scroll effect
 */
export const useParallax = (speed: number = 0.5) => {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!elementRef.current) return;

        const element = elementRef.current;
        const tween = gsap.to(element, {
            y: () => window.innerHeight * speed,
            ease: 'none',
            scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            },
        });

        return () => {
            tween.kill();
        };
    }, [speed]);

    return elementRef;
};

/**
 * Hook for staggered reveal animation
 */
export const useStaggerReveal = (
    selector: string,
    options?: {
        delay?: number;
        stagger?: number;
        y?: number;
        duration?: number;
    }
) => {
    useEffect(() => {
        const { delay = 0, stagger = 0.1, y = 50, duration = 0.8 } = options || {};

        const tween = gsap.from(selector, {
            opacity: 0,
            y,
            duration,
            stagger,
            delay,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: selector,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
            },
        });

        return () => {
            tween.kill();
        };
    }, [selector, options?.delay, options?.stagger, options?.y, options?.duration]);
};
