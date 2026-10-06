"use client";

import { useEffect, useMemo, useState } from "react";
import type { Workout } from "@/types/workout";
import WorkoutCard from "@/components/WorkoutCard";

export default function WorkoutLibrary() {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [search, setSearch] = useState("");
    const [difficulty, setDifficulty] = useState("All");
    const [muscle, setMuscle] = useState("All");
    const [sortBy, setSortBy] = useState("default");

    useEffect(() => {
        const loadWorkouts = async () => {
            try {
                setLoading(true);
                setError(false);

                const response = await fetch(
                    "https://api.abcz.workers.dev/api/fitlog"
                );

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
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        loadWorkouts();
    }, []);

    const difficulties = useMemo(() => {
        return [
            "All",
            ...Array.from(
                new Set(
                    workouts.map(
                        (workout) => workout.difficulty
                    )
                )
            ),
        ];
    }, [workouts]);

    const muscles = useMemo(() => {
        const allMuscles = workouts.flatMap(
            (workout) => workout.muscleGroups
        );

        return [
            "All",
            ...Array.from(new Set(allMuscles)),
        ];
    }, [workouts]);

    const filteredWorkouts = useMemo(() => {
        const filtered = workouts.filter((workout) => {
            const matchesSearch = workout.name
                .toLowerCase()
                .includes(search.toLowerCase());

            const matchesDifficulty =
                difficulty === "All" ||
                workout.difficulty === difficulty;

            const matchesMuscle =
                muscle === "All" ||
                workout.muscleGroups.includes(muscle);

            return (
                matchesSearch &&
                matchesDifficulty &&
                matchesMuscle
            );
        });

        return [...filtered].sort((a, b) => {
            if (sortBy === "duration") {
                return a.duration - b.duration;
            }

            if (sortBy === "calories") {
                return b.caloriesBurned - a.caloriesBurned;
            }

            if (sortBy === "rating") {
                return b.rating - a.rating;
            }

            return 0;
        });
    }, [
        workouts,
        search,
        difficulty,
        muscle,
        sortBy,
    ]);

    const resetFilters = () => {
        setSearch("");
        setDifficulty("All");
        setMuscle("All");
        setSortBy("default");
    };

    const hasActiveFilters =
        search !== "" ||
        difficulty !== "All" ||
        muscle !== "All" ||
        sortBy !== "default";

    return (
        <section
            id="library"
            className="px-4 py-16 sm:px-6 sm:py-20"
        >
            <div className="mx-auto max-w-7xl">
                <div className="mb-8">
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-[#ccff00]">
                        Workout Library
                    </p>

                    <h2 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
                        THE LIBRARY
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        Find the right workout and train with intent.
                    </p>
                </div>

                <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <input
                        type="text"
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                        placeholder="Search workouts..."
                        className="w-full rounded-lg border border-white/10 bg-[#15181e] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-[#ccff00]"
                    />

                    <select
                        value={difficulty}
                        onChange={(event) =>
                            setDifficulty(event.target.value)
                        }
                        className="w-full rounded-lg border border-white/10 bg-[#15181e] px-4 py-3 text-sm text-white outline-none focus:border-[#ccff00]"
                    >
                        {difficulties.map((item) => (
                            <option
                                key={item}
                                value={item}
                                className="bg-[#15181e]"
                            >
                                {item === "All"
                                    ? "All Difficulties"
                                    : item}
                            </option>
                        ))}
                    </select>

                    <select
                        value={muscle}
                        onChange={(event) =>
                            setMuscle(event.target.value)
                        }
                        className="w-full rounded-lg border border-white/10 bg-[#15181e] px-4 py-3 text-sm text-white outline-none focus:border-[#ccff00]"
                    >
                        {muscles.map((item) => (
                            <option
                                key={item}
                                value={item}
                                className="bg-[#15181e]"
                            >
                                {item === "All"
                                    ? "All Muscle Groups"
                                    : item}
                            </option>
                        ))}
                    </select>

                    <select
                        value={sortBy}
                        onChange={(event) =>
                            setSortBy(event.target.value)
                        }
                        className="w-full rounded-lg border border-white/10 bg-[#15181e] px-4 py-3 text-sm text-white outline-none focus:border-[#ccff00]"
                    >
                        <option
                            value="default"
                            className="bg-[#15181e]"
                        >
                            Sort By
                        </option>

                        <option
                            value="duration"
                            className="bg-[#15181e]"
                        >
                            Duration: Short → Long
                        </option>

                        <option
                            value="calories"
                            className="bg-[#15181e]"
                        >
                            Calories: High → Low
                        </option>

                        <option
                            value="rating"
                            className="bg-[#15181e]"
                        >
                            Rating: High → Low
                        </option>
                    </select>
                </div>

                <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-xs text-gray-500">
                        Showing{" "}
                        <span className="font-bold text-white">
                            {filteredWorkouts.length}
                        </span>{" "}
                        workout
                        {filteredWorkouts.length !== 1
                            ? "s"
                            : ""}
                    </p>

                    {hasActiveFilters && (
                        <button
                            type="button"
                            onClick={resetFilters}
                            className="rounded-lg border border-white/10 px-4 py-2 text-xs font-bold text-gray-400 transition hover:border-[#ccff00] hover:text-[#ccff00]"
                        >
                            Reset Filters
                        </button>
                    )}
                </div>

                {loading && (
                    <div className="py-16 text-center">
                        <p className="text-sm font-bold text-gray-500">
                            Loading workouts...
                        </p>
                    </div>
                )}

                {!loading && error && (
                    <div className="rounded-xl border border-red-500/20 bg-[#15181e] px-6 py-12 text-center">
                        <p className="text-lg font-bold text-white">
                            Failed to load workouts
                        </p>

                        <p className="mt-2 text-sm text-gray-500">
                            Please try again later.
                        </p>
                    </div>
                )}

                {!loading &&
                    !error &&
                    filteredWorkouts.length === 0 && (
                        <div className="rounded-xl border border-white/10 bg-[#15181e] px-6 py-12 text-center">
                            <p className="text-lg font-bold text-white">
                                No workouts found
                            </p>

                            <p className="mt-2 text-sm text-gray-500">
                                Try changing your search or filters.
                            </p>

                            {hasActiveFilters && (
                                <button
                                    type="button"
                                    onClick={resetFilters}
                                    className="mt-5 rounded-lg bg-[#ccff00] px-5 py-2.5 text-xs font-black text-black transition hover:bg-[#b8eb00]"
                                >
                                    Reset Filters
                                </button>
                            )}
                        </div>
                    )}

                {!loading &&
                    !error &&
                    filteredWorkouts.length > 0 && (
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredWorkouts.map(
                                (workout) => (
                                    <WorkoutCard
                                        key={workout.id}
                                        workout={workout}
                                    />
                                )
                            )}
                        </div>
                    )}
            </div>
        </section>
    );
}