"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";

export default function SmoothScrollProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const lenisRef = useRef<Lenis | null>(null);
    const rafCallbackRef = useRef<((time: number) => void) | null>(null);

    useEffect(() => {
        // Ensure we're on the client
        if (typeof window === "undefined") return;

        // Create Lenis instance
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        lenisRef.current = lenis;

        // Integrate with GSAP ScrollTrigger
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        lenis.on('scroll', (ScrollTrigger as any).update);

        // Create RAF callback and store reference
        const rafCallback = (time: number) => {
            lenis.raf(time * 1000);
        };
        rafCallbackRef.current = rafCallback;

        gsap.ticker.add(rafCallback);
        gsap.ticker.lagSmoothing(0);

        return () => {
            // Proper cleanup
            if (lenisRef.current) {
                lenisRef.current.destroy();
                lenisRef.current = null;
            }

            // Remove the exact callback reference
            if (rafCallbackRef.current) {
                gsap.ticker.remove(rafCallbackRef.current);
                rafCallbackRef.current = null;
            }
        };
    }, []);

    return <>{children}</>;
}
