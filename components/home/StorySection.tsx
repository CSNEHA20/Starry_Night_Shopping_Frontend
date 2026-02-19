"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "@/lib/gsap-config";

export default function StorySection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [glowParticles, setGlowParticles] = useState<Array<{ id: number; x: number; y: number; duration: number; delay: number }>>([]);
    const [bgParticles, setBgParticles] = useState<Array<{ id: number; x: number; y: number; bx: number; by: number; duration: number; delay: number }>>([]);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
    const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-15, 0, 15]);

    useEffect(() => {
        // Generate random particles client-side only
        setGlowParticles(Array.from({ length: 20 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 2,
        })));

        setBgParticles(Array.from({ length: 10 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            bx: Math.random() * 100 - 50,
            by: Math.random() * 100 - 50,
            duration: 5 + Math.random() * 3,
            delay: Math.random() * 2,
        })));

        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.from(".story-text", {
                opacity: 0,
                y: 100,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top center",
                    end: "center center",
                    scrub: 1,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen flex items-center justify-center py-32 overflow-hidden"
        >
            {/* Background gradient that changes on scroll - Made transparent for global starfield */}
            <motion.div
                style={{ opacity }}
                className="absolute inset-0 bg-transparent"
            />

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* 3D Rotating Artwork */}
                    <motion.div
                        style={{
                            opacity,
                            scale,
                            rotateY,
                        }}
                        className="relative"
                    >
                        <div className="aspect-square rounded-3xl glass p-8 relative overflow-hidden">
                            {/* Animated border */}
                            <div className="absolute inset-0 rounded-3xl border-2 border-gold/30 animate-glow-pulse" />

                            {/* Artwork placeholder with 3D effect */}
                            <div className="w-full h-full rounded-2xl bg-gradient-to-br from-gold/30 via-glow-blue/20 to-gold/30 flex items-center justify-center relative">
                                <div className="text-center">
                                    <p className="text-9xl mb-4">🎨</p>
                                    <p className="text-text-muted">Rotating on Scroll</p>
                                </div>

                                {/* Floating particles */}
                                <div className="absolute inset-0">
                                    {glowParticles.map((p) => (
                                        <motion.div
                                            key={p.id}
                                            className="absolute w-1 h-1 bg-gold rounded-full"
                                            style={{
                                                left: `${p.x}%`,
                                                top: `${p.y}%`,
                                            }}
                                            animate={{
                                                y: [0, -30, 0],
                                                opacity: [0, 1, 0],
                                            }}
                                            transition={{
                                                duration: p.duration,
                                                repeat: Infinity,
                                                delay: p.delay,
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Story Content */}
                    <div className="space-y-8">
                        <motion.h2
                            style={{ opacity }}
                            className="story-text text-5xl md:text-7xl font-display text-gold"
                        >
                            Timeless Masterpieces
                        </motion.h2>

                        <motion.p
                            style={{ opacity }}
                            className="story-text text-xl text-text-muted leading-relaxed"
                        >
                            Each artwork tells a story spanning centuries. From the medieval
                            era to modern abstracts, discover pieces that have shaped the
                            course of art history.
                        </motion.p>

                        <motion.p
                            style={{ opacity }}
                            className="story-text text-lg text-text-muted/80 leading-relaxed"
                        >
                            Our curated collection brings together the finest works from
                            renowned artists, offering you a chance to own a piece of history.
                        </motion.p>

                        <motion.div
                            style={{ opacity }}
                            className="story-text flex gap-4"
                        >
                            <div className="glass rounded-2xl p-6 flex-1">
                                <p className="text-3xl font-display text-gold mb-2">500+</p>
                                <p className="text-sm text-text-muted">Artworks</p>
                            </div>
                            <div className="glass rounded-2xl p-6 flex-1">
                                <p className="text-3xl font-display text-gold mb-2">50+</p>
                                <p className="text-sm text-text-muted">Artists</p>
                            </div>
                            <div className="glass rounded-2xl p-6 flex-1">
                                <p className="text-3xl font-display text-gold mb-2">8</p>
                                <p className="text-sm text-text-muted">Categories</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Moving light particles */}
            <div className="absolute inset-0 pointer-events-none">
                {bgParticles.map((p) => (
                    <motion.div
                        key={p.id}
                        className="absolute w-2 h-2 bg-gold/30 rounded-full blur-sm"
                        style={{
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                        }}
                        animate={{
                            x: [0, p.bx],
                            y: [0, p.by],
                            opacity: [0, 0.6, 0],
                        }}
                        transition={{
                            duration: p.duration,
                            repeat: Infinity,
                            delay: p.delay,
                        }}
                    />
                ))}
            </div>
        </section>
    );
}
