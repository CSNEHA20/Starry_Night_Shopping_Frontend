"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Artwork } from "@/lib/data/artworks";
import { formatPrice } from "@/lib/utils";

interface ArtworkCardProps {
    artwork: Artwork;
    index: number;
    enableEntranceAnimation?: boolean;
}

export default function ArtworkCard({ artwork, index, enableEntranceAnimation = true }: ArtworkCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    const animationProps = enableEntranceAnimation ? {
        initial: { opacity: 0, y: 50 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.6, delay: index * 0.1 },
        viewport: { once: true }
    } : {};

    return (
        <motion.div
            {...animationProps}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative h-[600px] rounded-3xl overflow-hidden glass"
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-midnight-800/80 to-midnight-900/80 backdrop-blur-xl" />

            {/* Artwork Image */}
            <div className="absolute inset-0 flex items-center justify-center p-12">
                <div
                    className="w-full h-full rounded-2xl overflow-hidden relative"
                    style={{
                        boxShadow: isHovered
                            ? "0 20px 60px rgba(212, 175, 55, 0.3)"
                            : "0 10px 30px rgba(212, 175, 55, 0.1)",
                        transition: "box-shadow 0.5s ease",
                    }}
                >
                    <Image
                        src={artwork.imageUrl}
                        alt={artwork.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 85vw, 600px"
                    />
                </div>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-midnight-950 via-midnight-950/90 to-transparent">
                <motion.div
                    animate={{
                        y: isHovered ? -10 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="mb-4">
                        <h3 className="text-3xl font-display mb-2 text-gold group-hover:text-gold-light transition-colors duration-300">
                            {artwork.title}
                        </h3>
                        <p className="text-text-muted mb-1">{artwork.artist}</p>
                        <p className="text-sm text-text-muted/70">
                            {artwork.year} • {artwork.medium}
                        </p>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-2xl font-semibold text-gold">
                                {formatPrice(artwork.price)}
                            </p>
                            <p className="text-xs text-text-muted">{artwork.category}</p>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 bg-gold text-midnight-950 font-semibold rounded-full hover:bg-gold-light transition-colors duration-300 gold-glow"
                        >
                            View Details
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            {/* Shimmer Effect */}
            <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                    background:
                        "linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.1), transparent)",
                    backgroundSize: "200% 100%",
                }}
                animate={{
                    backgroundPosition: isHovered ? ["0% 0%", "200% 0%"] : "0% 0%",
                }}
                transition={{
                    duration: 2,
                    repeat: isHovered ? Infinity : 0,
                    ease: "linear",
                }}
            />

            {/* 3D Lift Effect */}
            <motion.div
                className="absolute -inset-4 bg-gold/20 blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 -z-10"
                animate={{
                    scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.5 }}
            />
        </motion.div>
    );
}
