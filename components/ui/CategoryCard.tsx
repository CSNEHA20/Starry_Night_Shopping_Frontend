"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { Category } from "@/lib/data/artworks";


interface CategoryCardProps {
    category: Category;
    index: number;
}

export default function CategoryCard({ category, index }: CategoryCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer"
        >
            {/* Background Image */}
            <div className="absolute inset-0 bg-gradient-to-br from-midnight-800 to-midnight-900">
                <Image
                    src={category.imageUrl}
                    alt={category.name}
                    fill
                    className="object-cover opacity-50"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
            </div>

            {/* Animated Border */}
            <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{
                    border: "2px solid transparent",
                    backgroundImage:
                        "linear-gradient(#0F1B2E, #0F1B2E), linear-gradient(135deg, #D4AF37, #4F70E8)",
                    backgroundOrigin: "border-box",
                    backgroundClip: "padding-box, border-box",
                }}
                animate={{
                    opacity: isHovered ? 1 : 0.3,
                }}
            />

            {/* Content */}
            <div className="relative h-full p-8 flex flex-col justify-end z-10">
                <motion.div
                    style={{
                        transform: "translateZ(50px)",
                        transformStyle: "preserve-3d",
                    }}
                >
                    <h3 className="text-3xl font-display mb-2 text-gold group-hover:text-gold-light transition-colors duration-300">
                        {category.name}
                    </h3>
                    <p className="text-text-muted mb-4 group-hover:text-text-primary transition-colors duration-300">
                        {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-text-muted">
                            {category.count} artworks
                        </span>
                        <motion.div
                            animate={{
                                x: isHovered ? 5 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                            className="text-gold"
                        >
                            →
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Glow Effect */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-t from-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    mixBlendMode: "screen",
                }}
            />

            {/* Depth Shadow */}
            <div className="absolute -inset-4 bg-gold/10 blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10" />
        </motion.div>
    );
}
