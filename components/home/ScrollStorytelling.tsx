/* eslint-disable */
"use client";

import React, { useRef, useEffect } from "react";
import Image from 'next/image';
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { categories } from "@/lib/data/artworks";
import ThreeDCard from "@/components/ui/ThreeDCard";
import MagneticButton from "@/components/ui/MagneticButton";

export default function ScrollStorytelling() {
    const containerRef = useRef<HTMLDivElement>(null);
    const featuredRef = useRef<HTMLDivElement>(null);
    const categoryRef = useRef<HTMLDivElement>(null);
    const storyRef = useRef<HTMLDivElement>(null);

    // Refs for specific animations
    const featuredImageRef = useRef<HTMLDivElement>(null);
    const featuredTextRef = useRef<HTMLDivElement>(null);
    const categoryCardsRef = useRef<HTMLDivElement>(null);
    const storyLinesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            // 1. Featured Artwork Focus - Parallax
            if (featuredRef.current && featuredImageRef.current && featuredTextRef.current) {
                gsap.fromTo(featuredImageRef.current,
                    { y: -50 },
                    {
                        y: 50,
                        ease: "none",
                        scrollTrigger: {
                            trigger: featuredRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        }
                    }
                );

                // Text reveals when in view
                gsap.fromTo(featuredTextRef.current.children,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        stagger: 0.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: featuredRef.current,
                            start: "top 70%",
                        }
                    }
                );
            }

            // 2. Category Reveal - Staggered 3D Cards
            if (categoryRef.current && categoryCardsRef.current) {
                const cards = gsap.utils.toArray(categoryCardsRef.current.children);

                gsap.fromTo(cards,
                    { y: 100, opacity: 0, rotationX: 15 },
                    {
                        y: 0,
                        opacity: 1,
                        rotationX: 0,
                        duration: 1,
                        stagger: 0.15,
                        ease: "power4.out",
                        scrollTrigger: {
                            trigger: categoryRef.current,
                            start: "top 70%",
                        }
                    }
                );
            }

            // 3. Artist Story Block - Text Reveal
            if (storyRef.current && storyLinesRef.current) {
                const lines = gsap.utils.toArray(storyLinesRef.current.children);

                gsap.fromTo(lines,
                    { x: -50, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 1,
                        stagger: 0.1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: storyRef.current,
                            start: "top 60%",
                            end: "center center",
                            scrub: 1, // Smooth reveal on scroll
                        }
                    }
                );
            }

        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Placeholder data for featured artwork if not passed as props
    const featuredArt = {
        title: "The Starry Night",
        artist: "Vincent van Gogh",
        year: "1889",
        image: "/images/starry-night.jpeg"
    };

    return (
        <div ref={containerRef} className="w-full text-white overflow-hidden">

            {/* Section 1: Featured Artwork Focus */}
            <section ref={featuredRef} className="min-h-screen relative flex items-center justify-center py-20">
                {/* Background removed for global transparency */}

                <div className="container mx-auto px-4 z-10 relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Featured Image - Parallax */}
                    <div ref={featuredImageRef} className="relative h-[500px] w-full rounded-lg overflow-hidden border border-white/10 shadow-2xl">
                        <Image
                            src={featuredArt.image}
                            alt={featuredArt.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        {/* Overlay for mood */}
                        <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay" />
                    </div>

                    <div ref={featuredTextRef} className="space-y-6">
                        <h2 className="text-sm font-bold tracking-[0.2em] text-gold uppercase">Featured Masterpiece</h2>
                        <h1 className="text-5xl md:text-7xl font-display leading-tight">
                            {featuredArt.title}
                        </h1>
                        <p className="text-xl text-gray-300 max-w-lg">
                            An oil on canvas painting by {featuredArt.artist}. Painted in June {featuredArt.year}, it depicts the view from the east-facing window of his asylum room at Saint-Rémy-de-Provence.
                        </p>
                        <div className="pt-8">
                            <MagneticButton>
                                View Artwork
                            </MagneticButton>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: Category Reveal */}
            <section ref={categoryRef} className="min-h-screen z-10 relative py-24 bg-transparent">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-20 space-y-4">
                        <h2 className="text-4xl md:text-6xl font-display text-white">Explore Categories</h2>
                        <p className="text-gray-400">Dive into the eras that defined art history.</p>
                    </div>

                    <div ref={categoryCardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
                        {/* Using categories data or fallbacks */}
                        {categories ? categories.slice(0, 3).map((cat, idx) => (
                            <ThreeDCard
                                key={cat.id || idx}
                                title={cat.name}
                                description={cat.description}
                                imageSrc={cat.imageUrl}
                            />
                        )) : (
                            [1, 2, 3].map((i) => (
                                <ThreeDCard
                                    key={i}
                                    title={`Category ${i}`}
                                    description="A collection of fine art from this specific era."
                                />
                            ))
                        )}
                    </div>

                    <div className="mt-16 text-center">
                        <MagneticButton>
                            View All Categories
                        </MagneticButton>
                    </div>
                </div>
            </section>

            {/* Section 3: Artist Story Block */}
            <section ref={storyRef} className="min-h-screen relative flex items-center py-20 bg-transparent">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Image side */}
                    <div className="relative h-[600px] w-full rounded-lg overflow-hidden border border-white/10">
                        <Image
                            src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1000&auto=format&fit=crop"
                            alt="Artist Studio"
                            fill
                            className="object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    </div>

                    {/* Text side */}
                    <div ref={storyLinesRef} className="space-y-6 md:pl-10">
                        <h3 className="text-gold text-lg tracking-widest uppercase font-bold">The Artist's Journey</h3>
                        <p className="text-3xl md:text-5xl font-display leading-tight text-white/90">
                            "Great things are done by a series of small things brought together."
                        </p>
                        <p className="text-lg text-gray-400 leading-relaxed text-justify">
                            Art is not just about what you see, but what you feel. Every stroke tells a story of passion, struggle, and eventual triumph. Join us in celebrating the visionaries who dared to see the world differently.
                        </p>
                        <div className="pt-4">
                            <span className="text-sm text-white/50 block mb-2">Join the movement</span>
                            <MagneticButton>
                                Read Stories
                            </MagneticButton>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
