"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "@/lib/gsap-config";

export default function HeroSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Staggered text reveal animation
            gsap.from(".hero-title", {
                opacity: 0,
                y: 100,
                duration: 1.2,
                ease: "power4.out",
                delay: 0.3,
            });

            gsap.from(".hero-subtitle", {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power4.out",
                delay: 0.8,
            });

            gsap.from(".hero-cta", {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: "power4.out",
                delay: 1.3,
                stagger: 0.2,
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <motion.section
            ref={sectionRef}
            style={{ opacity, scale }}
            className="relative min-h-screen flex items-center justify-center overflow-hidden z-20"
        >
            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
                <h1 className="hero-title font-display text-7xl md:text-9xl lg:text-[12rem] leading-none mb-8">
                    <span className="block bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
                        Starry Night
                    </span>
                </h1>

                <p className="hero-subtitle text-xl md:text-3xl text-text-muted max-w-3xl mx-auto mb-12 leading-relaxed">
                    Discover timeless masterpieces across{" "}
                    <span className="text-gold">Medieval</span>,{" "}
                    <span className="text-gold">Renaissance</span>, and{" "}
                    <span className="text-gold">Modern</span> eras
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <motion.button
                        className="hero-cta group relative px-12 py-5 bg-gold text-midnight-950 font-semibold text-lg rounded-full overflow-hidden transition-all duration-300 hover:scale-105 gold-glow"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="relative z-10">Explore Gallery</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-gold-light to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.button>

                    <motion.button
                        className="hero-cta group px-12 py-5 glass border-2 border-gold/30 text-text-primary font-semibold text-lg rounded-full transition-all duration-300 hover:border-gold hover:bg-gold/10"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        View Collections
                    </motion.button>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-12 left-1/2 -translate-x-1/2"
                    animate={{
                        y: [0, 10, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <div className="w-6 h-10 border-2 border-gold/50 rounded-full flex items-start justify-center p-2">
                        <motion.div
                            className="w-1.5 h-1.5 bg-gold rounded-full"
                            animate={{
                                y: [0, 16, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    </div>
                </motion.div>
            </div>

        </motion.section>
    );
}
