"use client";

import { motion } from "framer-motion";
import { Artwork } from "@/types/artwork";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { formatPrice } from "@/lib/utils";

interface ArtworkGridProps {
    artworks: Artwork[];
}

export default function ArtworkGrid({ artworks }: ArtworkGridProps) {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {artworks.map((artwork, index) => (
                <Link key={artwork.id} href={`/artwork/${artwork.id}`}>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        onMouseEnter={() => setHoveredId(artwork.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        className="group relative h-[500px] rounded-2xl overflow-hidden glass cursor-pointer"
                    >
                        {/* Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-midnight-800/80 to-midnight-900/80 backdrop-blur-xl" />

                        {/* Artwork Image */}
                        <div className="absolute inset-0 flex items-center justify-center p-8">
                            <motion.div
                                animate={{
                                    scale: hoveredId === artwork.id ? 1.05 : 1,
                                    rotateY: hoveredId === artwork.id ? 5 : 0,
                                }}
                                transition={{ duration: 0.5 }}
                                className="w-full h-full rounded-xl overflow-hidden relative"
                                style={{
                                    boxShadow:
                                        hoveredId === artwork.id
                                            ? "0 20px 60px rgba(212, 175, 55, 0.3)"
                                            : "0 10px 30px rgba(212, 175, 55, 0.1)",
                                    transformStyle: "preserve-3d",
                                }}
                            >
                                <Image
                                    src={artwork.imageUrl}
                                    alt={artwork.title}
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                            </motion.div>
                        </div>

                        {/* Content Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-midnight-950 via-midnight-950/90 to-transparent">
                            <motion.div
                                animate={{
                                    y: hoveredId === artwork.id ? -10 : 0,
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                <h3 className="text-2xl font-display mb-2 text-gold group-hover:text-gold-light transition-colors duration-300">
                                    {artwork.title}
                                </h3>
                                <p className="text-text-muted mb-1">{artwork.artist}</p>
                                <div className="flex items-center justify-between mt-3">
                                    <p className="text-xl font-semibold text-gold">
                                        {formatPrice(artwork.price)}
                                    </p>
                                    <span className="text-sm text-text-muted/70">
                                        {artwork.year}
                                    </span>
                                </div>
                            </motion.div>
                        </div>

                        {/* Hover Glow Effect */}
                        <motion.div
                            className="absolute -inset-4 bg-gold/20 blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 -z-10"
                            animate={{
                                scale: hoveredId === artwork.id ? 1.1 : 1,
                            }}
                            transition={{ duration: 0.5 }}
                        />
                    </motion.div>
                </Link>
            ))}
        </div>
    );
}
