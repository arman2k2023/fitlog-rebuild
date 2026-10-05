"use client";

import { useEffect, useState } from "react";
import type { Workout } from "@/types/workout";
import WorkoutCard from "./WorkoutCard";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

export default function WorkoutLibrary() {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(API_URL);

                if (!response.ok) {
                    throw new Error("Failed to fetch workouts");
                }

                const data = await response.json();

                const workoutData = data?.data ?? data;

                setWorkouts(
                    Array.isArray(workoutData)
                        ? workoutData
                        : []
                );
            } catch {
                setError("Unable to load workouts.");
            } finally {
                setLoading(false);
            }
        };

        fetchWorkouts();
    }, []);

    return (
        <section
            id="library"
            className="px-4 py-12 sm:px-6 sm:py-16"
        >
            <div className="mx-auto max-w-7xl">

                {/* Heading */}
                <div className="mb-8">
                    <h2 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
                        THE LIBRARY
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        Twelve lifts covering every major muscle group.
                    </p>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div
                                key={index}
                                className="h-[380px] animate-pulse rounded-xl border border-white/10 bg-[#15181e]"
                            />
                        ))}
                    </div>
                )}

                {/* Error */}
                {!loading && error && (
                    <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6 text-center">
                        <p className="text-sm text-red-400">
                            {error}
                        </p>
                    </div>
                )}

                {/* Workout Grid */}
                {!loading && !error && (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {workouts.map((workout) => (
                            <WorkoutCard
                                key={workout.id}
                                workout={workout}
                            />
                        ))}
                    </div>
                )}

                {/* Empty */}
                {!loading &&
                    !error &&
                    workouts.length === 0 && (
                        <div className="rounded-xl border border-white/10 bg-[#15181e] p-10 text-center">
                            <p className="text-sm text-gray-400">
                                No workouts found.
                            </p>
                        </div>
                    )}
            </div>
        </section>
    );
}