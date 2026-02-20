import React from "react";
import { categories } from "@/lib/data/artworks";
import ThreeDCard from "@/components/ui/ThreeDCard";

export default function CategoryGrid() {
    return (
        <section className="py-20 px-4">
            <div className="container mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-12">
                    Browse by Category
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category) => (
                        <ThreeDCard
                            key={category.id}
                            title={category.name}
                            description={category.description}
                            imageSrc={category.imageUrl}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
