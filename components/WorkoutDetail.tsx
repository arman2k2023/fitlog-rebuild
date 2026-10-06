"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Workout } from "@/types/workout";

interface WorkoutDetailProps {
    workout: Workout;
}

export default function WorkoutDetail({
    workout,
}: WorkoutDetailProps) {
    const [added, setAdded] = useState(false);
    const [saved, setSaved] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const todayPlan = localStorage.getItem("todayPlan");
        const savedWorkouts =
            localStorage.getItem("savedWorkouts");

        try {
            const plan = todayPlan
                ? JSON.parse(todayPlan)
                : [];

            const savedItems = savedWorkouts
                ? JSON.parse(savedWorkouts)
                : [];

            setAdded(
                Array.isArray(plan) &&
                plan.some(
                    (item: Workout) =>
                        item.id === workout.id
                )
            );

            setSaved(
                Array.isArray(savedItems) &&
                savedItems.some(
                    (item: Workout) =>
                        item.id === workout.id
                )
            );
        } catch {
            setAdded(false);
            setSaved(false);
        }
    }, [workout.id]);

    const showMessage = (text: string) => {
        setMessage(text);

        setTimeout(() => {
            setMessage("");
        }, 2500);
    };

    const handleAddToPlan = () => {
        try {
            const existing =
                localStorage.getItem("todayPlan");

            const plan: Workout[] = existing
                ? JSON.parse(existing)
                : [];

            if (
                plan.some(
                    (item) => item.id === workout.id
                )
            ) {
                showMessage(
                    "Already added to today's plan."
                );
                return;
            }

            if (plan.length >= 5) {
                showMessage(
                    "Today's plan can contain only 5 lifts."
                );
                return;
            }

            const updatedPlan = [
                ...plan,
                workout,
            ];

            localStorage.setItem(
                "todayPlan",
                JSON.stringify(updatedPlan)
            );

            setAdded(true);

            window.dispatchEvent(
                new Event("planUpdated")
            );

            showMessage(
                "Added to today's plan."
            );
        } catch {
            showMessage(
                "Unable to add workout."
            );
        }
    };

    const handleSave = () => {
        try {
            const existing =
                localStorage.getItem(
                    "savedWorkouts"
                );

            const savedItems: Workout[] =
                existing
                    ? JSON.parse(existing)
                    : [];

            if (
                savedItems.some(
                    (item) =>
                        item.id === workout.id
                )
            ) {
                showMessage("Already saved.");
                return;
            }

            const updatedSaved = [
                ...savedItems,
                workout,
            ];

            localStorage.setItem(
                "savedWorkouts",
                JSON.stringify(updatedSaved)
            );

            setSaved(true);

            window.dispatchEvent(
                new Event("savedUpdated")
            );

            showMessage(
                "Saved for later."
            );
        } catch {
            showMessage(
                "Unable to save workout."
            );
        }
    };

    return (
        <main className="min-h-screen bg-[#0b0d10] text-white">

            {/* Back Button */}
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
                <Link
                    href="/"
                    className="text-sm font-bold text-gray-400 transition hover:text-[#ccff00]"
                >
                    ← Back to workouts
                </Link>
            </div>

            {/* Details */}
            <section className="px-4 pb-16 sm:px-6">
                <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">

                    {/* Image */}
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#15181e]">
                        <img
                            src={workout.image}
                            alt={workout.name}
                            className="h-full min-h-[350px] w-full object-cover sm:min-h-[500px]"
                        />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-center">

                        {/* Muscle Tags */}
                        <div className="mb-4 flex flex-wrap gap-2">
                            {workout.muscleGroups.map(
                                (muscle) => (
                                    <span
                                        key={muscle}
                                        className="rounded-full bg-[#ccff00] px-3 py-1 text-[10px] font-black uppercase text-black"
                                    >
                                        {muscle}
                                    </span>
                                )
                            )}
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl font-black uppercase leading-none sm:text-5xl">
                            {workout.name}
                        </h1>

                        {/* Description */}
                        <p className="mt-5 text-sm leading-7 text-gray-400">
                            {workout.description}
                        </p>

                        {/* Specs */}
                        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">

                            <div className="rounded-lg border border-white/10 bg-[#15181e] p-4">
                                <p className="text-[10px] uppercase text-gray-500">
                                    Equipment
                                </p>

                                <p className="mt-1 text-sm font-bold">
                                    {workout.equipment}
                                </p>
                            </div>

                            <div className="rounded-lg border border-white/10 bg-[#15181e] p-4">
                                <p className="text-[10px] uppercase text-gray-500">
                                    Difficulty
                                </p>

                                <p className="mt-1 text-sm font-bold">
                                    {workout.difficulty}
                                </p>
                            </div>

                            <div className="rounded-lg border border-white/10 bg-[#15181e] p-4">
                                <p className="text-[10px] uppercase text-gray-500">
                                    Sets
                                </p>

                                <p className="mt-1 text-sm font-bold">
                                    {workout.sets}
                                </p>
                            </div>

                            <div className="rounded-lg border border-white/10 bg-[#15181e] p-4">
                                <p className="text-[10px] uppercase text-gray-500">
                                    Reps
                                </p>

                                <p className="mt-1 text-sm font-bold">
                                    {workout.reps}
                                </p>
                            </div>

                            <div className="rounded-lg border border-white/10 bg-[#15181e] p-4">
                                <p className="text-[10px] uppercase text-gray-500">
                                    Duration
                                </p>

                                <p className="mt-1 text-sm font-bold">
                                    {workout.duration} min
                                </p>
                            </div>

                            <div className="rounded-lg border border-white/10 bg-[#15181e] p-4">
                                <p className="text-[10px] uppercase text-gray-500">
                                    Calories
                                </p>

                                <p className="mt-1 text-sm font-bold">
                                    {workout.caloriesBurned} kcal
                                </p>
                            </div>

                        </div>

                        {/* Rating */}
                        <div className="mt-5 text-sm text-gray-400">
                            Rating:

                            <span className="ml-2 font-bold text-[#ccff00]">
                                ★ {workout.rating}
                            </span>
                        </div>

                        {/* Instructions */}
                        <div className="mt-8">
                            <h2 className="text-xl font-black uppercase">
                                Instructions
                            </h2>

                            <ol className="mt-4 space-y-3">
                                {workout.instructions.map(
                                    (
                                        instruction,
                                        index
                                    ) => (
                                        <li
                                            key={index}
                                            className="flex gap-3 text-sm leading-6 text-gray-400"
                                        >
                                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ccff00] text-xs font-black text-black">
                                                {index + 1}
                                            </span>

                                            <span>
                                                {instruction}
                                            </span>
                                        </li>
                                    )
                                )}
                            </ol>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                            <button
                                onClick={handleAddToPlan}
                                disabled={added}
                                className="rounded-lg bg-[#ccff00] px-5 py-3 text-sm font-black text-black transition hover:bg-[#b8eb00] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {added
                                    ? "✓ Added to Today's Plan"
                                    : "+ Add to Today's Plan"}
                            </button>

                            <button
                                onClick={handleSave}
                                disabled={saved}
                                className="rounded-lg border border-white/20 px-5 py-3 text-sm font-black text-white transition hover:border-[#ccff00] hover:text-[#ccff00] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {saved
                                    ? "✓ Saved"
                                    : "♡ Save for Later"}
                            </button>

                        </div>

                    </div>
                </div>
            </section>

            {/* Toast */}
            {message && (
                <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg border border-[#ccff00]/30 bg-[#15181e] px-5 py-3 text-sm font-bold text-white shadow-xl">
                    {message}
                </div>
            )}

        </main>
    );
}