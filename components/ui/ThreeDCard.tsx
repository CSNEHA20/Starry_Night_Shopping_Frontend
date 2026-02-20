import React from "react";
import Image from "next/image";

interface ThreeDCardProps {
    title: string;
    description: string;
    imageSrc?: string;
    className?: string; // Added to match likely usage
}

export default function ThreeDCard({
    title,
    description,
    imageSrc,
    className,
}: ThreeDCardProps) {
    return (
        <div className={`p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm ${className || ''}`}>
            {imageSrc && (
                <div className="relative h-48 w-full mb-4 overflow-hidden rounded-lg">
                    <Image
                        src={imageSrc}
                        alt={title}
                        fill
                        className="object-cover"
                    />
                </div>
            )}
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-sm text-gray-300">{description}</p>
        </div>
    );
}
