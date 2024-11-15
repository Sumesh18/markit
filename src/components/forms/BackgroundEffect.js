'use client';
import { animate, useMotionValue, useMotionTemplate } from 'framer-motion';
import { useEffect } from 'react';

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

export default function BackgroundEffect() {
    const color = useMotionValue(COLORS_TOP[0]);

    useEffect(() => {
        animate(color, COLORS_TOP, {
            ease: "easeInOut",
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror",
        });
    }, []);

    const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;

    return (
        <div
            style={{
                backgroundImage,
            }}
            className="absolute inset-0 -z-10 min-h-screen bg-gray-950"
        />
    );
}
