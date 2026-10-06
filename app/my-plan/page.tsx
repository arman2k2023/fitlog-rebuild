"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Workout } from "@/types/workout";
import MyPlanCard from "@/components/MyPlanCard";

export default function MyPlanPage() {
    const [plan, setPlan] = useState<Workout[]>([]);
    const [saved, setSaved] = useState<Workout[]>([]);
    const [activeTab, setActiveTab] = useState<
        "plan" | "saved"
    >("plan");
    const [loading, setLoading] = useState(true);

    // Sort By
    const [sortBy, setSortBy] = useState("duration");

    useEffect(() => {
        const loadData = () => {
            try {
                const savedPlan =
                    localStorage.getItem("todayPlan");

                const savedWorkouts =
                    localStorage.getItem("savedWorkouts");

                setPlan(
                    savedPlan
                        ? JSON.parse(savedPlan)
                        : []
                );

                setSaved(
                    savedWorkouts
                        ? JSON.parse(savedWorkouts)
                        : []
                );
            } catch {
                setPlan([]);
                setSaved([]);
            } finally {
                setLoading(false);
            }
        };

        loadData();

        window.addEventListener(
            "planUpdated",
            loadData
        );

        window.addEventListener(
            "savedUpdated",
            loadData
        );

        return () => {
            window.removeEventListener(
                "planUpdated",
                loadData
            );

            window.removeEventListener(
                "savedUpdated",
                loadData
            );
        };
    }, []);

    // Active tab data
    const activeWorkouts =
        activeTab === "plan" ? plan : saved;

    // Sort workouts
    const sortedWorkouts = useMemo(() => {
        return [...activeWorkouts].sort((a, b) => {
            if (sortBy === "duration") {
                return a.duration - b.duration;
            }

            if (sortBy === "calories") {
                return (
                    b.caloriesBurned -
                    a.caloriesBurned
                );
            }

            if (sortBy === "rating") {
                return b.rating - a.rating;
            }

            return 0;
        });
    }, [activeWorkouts, sortBy]);

    // Metrics for active tab
    const totalMinutes = activeWorkouts.reduce(
        (total, workout) =>
            total + workout.duration,
        0
    );

    const totalCalories = activeWorkouts.reduce(
        (total, workout) =>
            total + workout.caloriesBurned,
        0
    );

    return (
        <main className="min-h-screen bg-[#0b0d10] px-4 py-8 text-white sm:px-6 sm:py-12">

            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div>
                    <h1 className="text-4xl font-black uppercase tracking-tight sm:text-5xl">
                        MY PLAN
                    </h1>

                    <p className="mt-3 text-sm text-gray-500">
                        Cap of five lifts for today. Finish them,
                        then load more.
                    </p>
                </div>

                {/* Metrics */}
                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

                    {/* Exercises */}
                    <div className="rounded-xl border border-white/10 bg-[#15181e] p-5">
                        <p className="text-xs uppercase tracking-wider text-gray-500">
                            Exercises
                        </p>

                        <p className="mt-2 text-3xl font-black text-[#ccff00]">
                            {activeWorkouts.length}
                        </p>
                    </div>

                    {/* Minutes */}
                    <div className="rounded-xl border border-white/10 bg-[#15181e] p-5">
                        <p className="text-xs uppercase tracking-wider text-gray-500">
                            Minutes
                        </p>

                        <p className="mt-2 text-3xl font-black text-[#ccff00]">
                            {totalMinutes}
                        </p>
                    </div>

                    {/* Calories */}
                    <div className="rounded-xl border border-white/10 bg-[#15181e] p-5">
                        <p className="text-xs uppercase tracking-wider text-gray-500">
                            Calories
                        </p>

                        <p className="mt-2 text-3xl font-black text-[#ccff00]">
                            {totalCalories}
                        </p>
                    </div>

                </div>

                {/* Tabs + Sort */}
                <div className="mt-10 flex flex-col gap-4 border-b border-white/10 pb-3 sm:flex-row sm:items-center sm:justify-between">

                    {/* Tabs */}
                    <div className="flex gap-3">

                        <button
                            onClick={() =>
                                setActiveTab("plan")
                            }
                            className={`rounded-full px-5 py-2 text-sm font-bold transition ${activeTab === "plan"
                                    ? "bg-[#ccff00] text-black"
                                    : "text-gray-400 hover:text-white"
                                }`}
                        >
                            Today's Plan
                        </button>

                        <button
                            onClick={() =>
                                setActiveTab("saved")
                            }
                            className={`rounded-full px-5 py-2 text-sm font-bold transition ${activeTab === "saved"
                                    ? "bg-[#ccff00] text-black"
                                    : "text-gray-400 hover:text-white"
                                }`}
                        >
                            Saved
                        </button>

                    </div>

                    {/* Sort By */}
                    <div className="flex items-center gap-2">

                        <label
                            htmlFor="sort"
                            className="text-xs font-bold uppercase tracking-wider text-gray-500"
                        >
                            Sort By
                        </label>

                        <div className="relative">

                            <select
                                id="sort"
                                value={sortBy}
                                onChange={(event) =>
                                    setSortBy(
                                        event.target.value
                                    )
                                }
                                className="appearance-none rounded-lg border border-white/10 bg-[#15181e] px-4 py-2.5 pr-10 text-sm font-bold text-white outline-none transition focus:border-[#ccff00]"
                            >
                                <option
                                    value="duration"
                                    className="bg-[#15181e]"
                                >
                                    Duration
                                </option>

                                <option
                                    value="calories"
                                    className="bg-[#15181e]"
                                >
                                    Calories
                                </option>

                                <option
                                    value="rating"
                                    className="bg-[#15181e]"
                                >
                                    Rating
                                </option>
                            </select>

                            {/* Chevron */}
                            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M6 9L12 15L18 9"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>

                        </div>
                    </div>

                </div>

                {/* Loading */}
                {loading && (
                    <div className="py-16 text-center">
                        <p className="animate-pulse text-sm text-gray-500">
                            Loading workouts…
                        </p>
                    </div>
                )}

                {/* Empty */}
                {!loading &&
                    sortedWorkouts.length === 0 && (
                        <div className="py-20 text-center">

                            <h2 className="text-2xl font-black uppercase">
                                Nothing Here Yet
                            </h2>

                            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
                                Browse the library and add a lift
                                to get today moving.
                            </p>

                            <Link
                                href="/"
                                className="mt-6 inline-flex rounded-lg bg-[#ccff00] px-6 py-3 text-sm font-black text-black transition hover:bg-[#b8eb00]"
                            >
                                Go to workouts
                            </Link>

                        </div>
                    )}

                {/* Cards */}
                {!loading &&
                    sortedWorkouts.length > 0 && (
                        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">

                            {sortedWorkouts.map(
                                (workout) => (
                                    <MyPlanCard
                                        key={workout.id}
                                        workout={workout}
                                        type={activeTab}
                                        onUpdate={() => {
                                            window.dispatchEvent(
                                                new Event(
                                                    activeTab ===
                                                        "plan"
                                                        ? "planUpdated"
                                                        : "savedUpdated"
                                                )
                                            );
                                        }}
                                    />
                                )
                            )}

                        </div>
                    )}

            </div>
        </main>
    );
}