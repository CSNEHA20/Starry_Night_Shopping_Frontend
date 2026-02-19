"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "@/lib/gsap-config";
import { artworks } from "@/lib/data/artworks";
import ArtworkCard from "@/components/ui/ArtworkCard";

export default function FeaturedArt() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current || !scrollRef.current) return;

        const ctx = gsap.context(() => {

            const totalWidth = scrollRef.current!.scrollWidth;
            const viewportWidth = window.innerWidth;
            const distance = totalWidth - viewportWidth + 64; // + padding

            gsap.to(scrollRef.current, {
                x: -distance,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    pin: true,
                    scrub: 1, // Smooth dragging
                    invalidateOnRefresh: true,
                    end: () => "+=" + distance, // 1:1 scroll speed feels most natural usually, maybe stick to it but ensure pin is clean.
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const featuredArtworks = artworks.filter((art) => art.featured);

    return (
        <div className="relative">
            <section ref={sectionRef} className="relative min-h-screen flex flex-col justify-center py-24 overflow-hidden bg-transparent -mt-8">
                <div className="max-w-7xl mx-auto px-4 md:px-8 mb-16 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <h2 className="text-5xl md:text-7xl font-display mb-6 text-gold">
                            Featured Masterpieces
                        </h2>
                        <p className="text-xl text-text-muted max-w-2xl mx-auto">
                            Curated collection of timeless artworks
                        </p>
                    </motion.div>
                </div>

                {/* Horizontal Scroll Container */}
                <div ref={scrollRef} className="flex gap-8 px-4 md:px-8 w-max">
                    {featuredArtworks.map((artwork, index) => (
                        <div key={artwork.id} className="artwork-card flex-shrink-0 w-[85vw] md:w-[600px]">
                            <ArtworkCard artwork={artwork} index={index} enableEntranceAnimation={false} />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
