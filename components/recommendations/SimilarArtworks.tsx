'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type { RecommendedArtwork } from '@/types/recommendation';
import { artworks } from '@/lib/data/artworks';
import Link from 'next/link';

// ============================================================================
// Similar Artworks Component
// ============================================================================

interface SimilarArtworksProps {
    currentArtworkId: string;
    currentArtworkTitle: string;
    limit?: number;
}

export function SimilarArtworks({
    currentArtworkId,
    currentArtworkTitle,
    limit = 4,
}: SimilarArtworksProps) {
    const [recommendations, setRecommendations] = useState<RecommendedArtwork[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchSimilarArtworks = useCallback(async () => {
        try {
            // Client-side simulation
            await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay

            // Filter artworks: exclude current, same category is preferred
            const currentArt = artworks.find(a => a.id === currentArtworkId);
            const category = currentArt?.category;

            const similar = artworks.filter(a => a.id !== currentArtworkId);

            // Sort by relevance (same category first)
            similar.sort((a, b) => {
                const aScore = a.category === category ? 1 : 0;
                const bScore = b.category === category ? 1 : 0;
                return bScore - aScore;
            });

            // Take top N
            const selected = similar.slice(0, limit);

            // Map to RecommendedArtwork format
            const mappedRecommendations: RecommendedArtwork[] = selected.map((art, idx) => ({
                artworkId: art.id,
                score: art.category === category ? 0.9 : 0.5,
                reason: art.category === category ? 'Similar Category' : 'Popular',
                rank: idx + 1,
                artwork: art
            }));

            setRecommendations(mappedRecommendations);
        } catch (error) {
            console.error('Failed to fetch similar artworks:', error);
        } finally {
            setLoading(false);
        }
    }, [currentArtworkId, limit]);
    useEffect(() => {
        fetchSimilarArtworks();
    }, [fetchSimilarArtworks]);

    if (recommendations.length === 0 && !loading) {
        return null;
    }

    return (
        <section className="py-16 px-6 bg-midnight-900/30">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <h2 className="font-playfair text-3xl md:text-4xl text-white mb-2">
                        Similar Artworks
                    </h2>
                    <p className="text-text-muted">
                        Because you&apos;re viewing{' '}
                        <span className="text-gold">{currentArtworkTitle}</span>
                    </p>
                </motion.div>

                {/* Loading State */}
                {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {Array.from({ length: limit }).map((_, i) => (
                            <div
                                key={i}
                                className="h-80 bg-midnight-800/50 rounded-xl animate-pulse"
                            />
                        ))}
                    </div>
                )}

                {/* Recommendations Grid */}
                {!loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {recommendations.map((rec, index) => (
                            <SimilarArtworkCard
                                key={rec.artworkId}
                                recommendation={rec}
                                index={index}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

// ============================================================================
// Similar Artwork Card Component
// ============================================================================

interface SimilarArtworkCardProps {
    recommendation: RecommendedArtwork;
    index: number;
}

function SimilarArtworkCard({ recommendation, index }: SimilarArtworkCardProps) {
    const { artwork } = recommendation;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
        >
            <Link href={`/artwork/${artwork.id}`}>
                <div className="group relative overflow-hidden rounded-xl bg-midnight-800/40 backdrop-blur-sm border border-midnight-700/50 hover:border-gold/40 transition-all duration-500 hover:scale-105">
                    {/* Image Container */}
                    <div className="relative h-64 overflow-hidden">
                        <Image
                            src={artwork.imageUrl}
                            alt={artwork.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-transparent to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
                    </div>

                    {/* Content */}
                    <div className="p-4">
                        <h3 className="font-playfair text-lg text-white mb-1 group-hover:text-gold transition-colors duration-300 truncate">
                            {artwork.title}
                        </h3>
                        <p className="text-sm text-text-muted mb-2 truncate">
                            {artwork.artist}
                        </p>
                        <p className="text-gold font-semibold text-sm">
                            ${artwork.price.toLocaleString()}
                        </p>
                    </div>

                    {/* Subtle glow on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-br from-glow-blue/5 to-transparent" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
