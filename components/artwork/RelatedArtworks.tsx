"use client";

import { motion } from "framer-motion";
import { Artwork } from "@/types/artwork";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";

interface RelatedArtworksProps {
    artworks: Artwork[];
}

export default function RelatedArtworks({ artworks }: RelatedArtworksProps) {
    if (artworks.length === 0) return null;

    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mt-32">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <h2 className="text-4xl md:text-5xl font-display mb-12 text-gold">
                    Related Artworks
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {artworks.map((artwork, index) => (
                        <Link key={artwork.id} href={`/artwork/${artwork.id}`}>
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10 }}
                                className="group relative h-96 rounded-2xl overflow-hidden glass cursor-pointer"
                            >
                                {/* Background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-midnight-800/80 to-midnight-900/80 backdrop-blur-xl" />

                                {/* Artwork Image */}
                                <div className="absolute inset-0 flex items-center justify-center p-6">
                                    <div className="w-full h-full rounded-xl overflow-hidden relative">
                                        <Image
                                            src={artwork.imageUrl}
                                            alt={artwork.title}
                                            fill
                                            className="object-contain"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-midnight-950 to-transparent">
                                    <h3 className="text-xl font-display mb-1 text-gold group-hover:text-gold-light transition-colors duration-300">
                                        {artwork.title}
                                    </h3>
                                    <p className="text-sm text-text-muted mb-2">{artwork.artist}</p>
                                    <p className="text-lg font-semibold text-gold">
                                        {formatPrice(artwork.price)}
                                    </p>
                                </div>

                                {/* Hover Glow */}
                                <div className="absolute -inset-4 bg-gold/20 blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 -z-10" />
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
