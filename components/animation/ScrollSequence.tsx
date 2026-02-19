"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap-config";
import { cn } from "@/lib/utils";

interface ScrollSequenceProps {
    imageSequenceSrc: string; // e.g. "/image-sequence-background"
    frameCount: number;
    className?: string;
    children?: React.ReactNode;
}

export default function ScrollSequence({
    imageSequenceSrc,
    frameCount,
    className,
    children,
}: ScrollSequenceProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
    const frameRef = useRef(0);

    useEffect(() => {
        console.log("ScrollSequence mounted");
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const context = canvas.getContext("2d", { alpha: false });
        if (!context) {
            console.error("Could not get 2D context");
            return;
        }

        // Initialize images array if empty
        if (imagesRef.current.length !== frameCount) {
            imagesRef.current = new Array(frameCount).fill(null);
        }

        let loadedCount = 0;
        let isMounted = true;

        // Preload images
        for (let i = 1; i <= frameCount; i++) {
            if (imagesRef.current[i - 1]) {
                loadedCount++; // Already loaded
                continue;
            }

            const img = new Image();
            img.src = `${imageSequenceSrc}/${String(i).padStart(5, "0")}.png`;
            img.onload = () => {
                if (!isMounted) return;
                loadedCount++;
                setLoadingProgress((loadedCount / frameCount) * 100);
                imagesRef.current[i - 1] = img;

                if (i === 1) {
                    console.log("Frame 1 loaded, attempting initial render");
                    render();
                }
            };
            img.onerror = (e) => {
                console.error(`Failed to load image at index ${i}`, e);
            };
        }

        const render = () => {
            if (!canvas || !context) return;

            // Clamp frame index
            let index = Math.round(frameRef.current);
            if (index < 0) index = 0;
            if (index >= frameCount) index = frameCount - 1;

            const img = imagesRef.current[index];

            if (img && img.complete && img.naturalWidth > 0) {
                // "Cover" fit logic
                const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
                const x = (canvas.width / 2) - (img.width / 2) * scale;
                const y = (canvas.height / 2) - (img.height / 2) * scale;

                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(img, x, y, img.width * scale, img.height * scale);
            } else {
                // Debug log only occasionally to avoid spam
                if (Math.random() < 0.01) console.log(`Frame ${index} not ready`);
            }
        };

        const handleResize = () => {
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                render();
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Initial size

        // GSAP Animation
        const st = ScrollTrigger.create({
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
            onUpdate: (self) => {
                frameRef.current = self.progress * (frameCount - 1);
                requestAnimationFrame(render);
            },
        });

        return () => {
            isMounted = false;
            window.removeEventListener("resize", handleResize);
            st.kill();
        };
    }, [frameCount, imageSequenceSrc]);

    return (
        <div ref={containerRef} className={cn("fixed inset-0 w-full h-full bg-black -z-10", className)}>
            <canvas
                ref={canvasRef}
                className="block w-full h-full object-cover"
            />
            {/* Loading Indicator */}
            {loadingProgress < 100 && (
                <div className="absolute top-4 right-4 text-white text-xs z-50 opacity-50 font-mono">
                    SEQ: {Math.round(loadingProgress)}%
                </div>
            )}

            {/* Overlay Content */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                {children}
            </div>
        </div>
    );
}
