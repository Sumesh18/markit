'use client';

import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import { animate, motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

export default function HeroForm({ user }) {

    const router = useRouter();

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
    const border = useMotionTemplate`1px solid ${color}`;
    const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

    useEffect(() => {
        if ('localStorage' in window && window.localStorage.getItem('desiredUsername')) {
            const username = window.localStorage.getItem('desiredUsername');
            window.localStorage.removeItem('desiredUsername');
            router.push(`/account/${username}`);
        }
    }, [router]);

    async function handleSubmit(ev) {
        ev.preventDefault();
        const form = ev.target;
        const input = form.querySelector('input');
        const username = input.value;
        if (username.length > 0) {
            if (user) {
                // router.push('/account?desiredUsername=' + username);
                router.push(`/${username}`);
            } else {
                <h1>User not found</h1>
                window.localStorage.setItem('desiredUsername', username);
                // await signIn('google');
                router.push('/login');
            }
        }
    }

    return (
        <motion.section
            style={{
                backgroundImage,
            }}
            className="relative flex min-h-screen w-screen place-content-center overflow-hidden bg-gray-950 px-4 py-8 text-gray-200"
        >
            <div className="relative z-10 flex flex-col items-center">
                <h1 className="max-w-2xl bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-2xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight">
                One Place for All Your Links
                </h1>
                <p className="my-6 max-w-md text-center text-base leading-relaxed md:text-lg md:leading-relaxed">
                    Save and Share Your Links, Socials, and Bookmarks to anyone with ease
                </p>
                <form
                    id="markitForm"
                    onSubmit={handleSubmit}
                    className="inline-flex items-center justify-center bg-white shadow-lg shadow-gray-700/50 p-1 rounded-full">
                    <span className="bg-white text-black font-bold py-4 pl-2 text-lg rounded-full">markit/</span>
                    <input
                        type="text"
                        style={{ backgroundColor: 'white', marginBottom: 0, paddingLeft: 0, outline: 'none', color: "#333" }}
                        placeholder="username"
                        className="text-black text-lg font-semibold rounded-full"
                    />
                </form>
                <motion.button
                    form="markitForm"
                    style={{
                        border,
                        boxShadow,
                    }}
                    whileHover={{
                        scale: 1.015,
                    }}
                    whileTap={{
                        scale: 0.985,
                    }}
                    className="group mt-4 whitespace-nowrap relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-black transition-colors hover:bg-gray-950/50 text-white"
                >
                    Get Started!
                    <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
                </motion.button>
            </div>
            <div className="absolute inset-0 z-0">
                <Canvas>
                    <Stars radius={50} count={2500} factor={4} fade speed={3} />
                </Canvas>
            </div>
        </motion.section>
    )
}
