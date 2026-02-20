import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Collection } from "@/lib/data/curated-collections";

interface FeaturedCollectionsProps {
    collections: Collection[];
}

export default function FeaturedCollections({ collections }: FeaturedCollectionsProps) {
    return (
        <section className="py-20 px-4 bg-white/5">
            <div className="container mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-12">
                    Curated Collections
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {collections.map((collection) => (
                        <Link href={collection.link} key={collection.id} className="group block">
                            <div className="relative h-80 rounded-xl overflow-hidden mb-4 border border-white/10">
                                <Image
                                    src={collection.imageUrl}
                                    alt={collection.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                                <div className="absolute bottom-0 left-0 p-6">
                                    <h3 className="text-2xl font-bold text-white mb-2">{collection.title}</h3>
                                    <p className="text-gray-200 text-sm">{collection.description}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
