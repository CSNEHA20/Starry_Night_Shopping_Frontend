import React from "react";

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export default function MagneticButton({
    children,
    className,
    onClick,
}: MagneticButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-colors duration-300 text-white font-medium ${className || ''}`}
        >
            {children}
        </button>
    );
}
