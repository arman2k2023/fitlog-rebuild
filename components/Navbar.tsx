"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [planCount, setPlanCount] = useState(0);
    const [savedCount, setSavedCount] = useState(0);

    useEffect(() => {
        const updateCounts = () => {
            const savedPlan = localStorage.getItem("todayPlan");
            const savedWorkouts =
                localStorage.getItem("savedWorkouts");

            try {
                const plan = savedPlan
                    ? JSON.parse(savedPlan)
                    : [];

                const saved = savedWorkouts
                    ? JSON.parse(savedWorkouts)
                    : [];

                setPlanCount(Array.isArray(plan) ? plan.length : 0);
                setSavedCount(
                    Array.isArray(saved) ? saved.length : 0
                );
            } catch {
                setPlanCount(0);
                setSavedCount(0);
            }
        };

        updateCounts();

        window.addEventListener(
            "storage",
            updateCounts
        );

        window.addEventListener(
            "planUpdated",
            updateCounts
        );

        window.addEventListener(
            "savedUpdated",
            updateCounts
        );

        return () => {
            window.removeEventListener(
                "storage",
                updateCounts
            );

            window.removeEventListener(
                "planUpdated",
                updateCounts
            );

            window.removeEventListener(
                "savedUpdated",
                updateCounts
            );
        };
    }, []);

    return (
        <header className="border-b border-white/10 bg-[#0b0d10]">
            <div className="mx-auto flex min-h-20 max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">

                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2"
                >
                    <Image
                        src="/logo.png"
                        alt="FitLog Logo"
                        width={42}
                        height={42}
                        priority
                        className="h-9 w-9 object-contain sm:h-10 sm:w-10"
                    />

                    <span className="text-xl font-black tracking-tight text-white sm:text-2xl">
                        FITLOG
                    </span>
                </Link>

                {/* Navigation */}
                <nav className="order-3 flex w-full items-center justify-center gap-3 sm:order-none sm:w-auto sm:gap-6">
                    <Link
                        href="/"
                        className="rounded-full border border-[#ccff00] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#ccff00]/10 sm:px-5 sm:text-sm"
                    >
                        Workout
                    </Link>

                    <Link
                        href="/my-plan"
                        className="rounded-full px-4 py-2 text-xs font-bold text-gray-400 transition hover:text-white sm:px-5 sm:text-sm"
                    >
                        My Plan
                    </Link>
                </nav>

                {/* Status Badges */}
                <div className="flex items-center gap-2 sm:gap-3">

                    {/* Plan */}
                    <Link
                        href="/my-plan"
                        className="rounded-full bg-[#ccff00] px-3 py-2 text-xs font-bold text-black transition hover:bg-[#b8eb00] sm:px-4 sm:text-sm"
                    >
                        Plan {planCount}
                    </Link>

                    {/* Saved */}
                    <Link
                        href="/my-plan"
                        className="rounded-full border border-white/20 px-3 py-2 text-xs font-bold text-white transition hover:border-[#ccff00] hover:text-[#ccff00] sm:px-4 sm:text-sm"
                    >
                        Saved {savedCount}
                    </Link>

                </div>
            </div>
        </header>
    );
}