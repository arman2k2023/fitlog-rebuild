"use client";

import Link from "next/link";
import { useState } from "react";
import type { Workout } from "@/types/workout";

interface MyPlanCardProps {
    workout: Workout;
    type: "plan" | "saved";
    onUpdate: () => void;
}

export default function MyPlanCard({
    workout,
    type,
    onUpdate,
}: MyPlanCardProps) {
    const [message, setMessage] = useState("");

    const showToast = (text: string) => {
        setMessage(text);

        setTimeout(() => {
            setMessage("");
        }, 2500);
    };

    const handleRemove = () => {
        try {
            const key =
                type === "plan"
                    ? "todayPlan"
                    : "savedWorkouts";

            const existing = localStorage.getItem(key);

            const items: Workout[] = existing
                ? JSON.parse(existing)
                : [];

            const updatedItems = items.filter(
                (item) => item.id !== workout.id
            );

            localStorage.setItem(
                key,
                JSON.stringify(updatedItems)
            );

            window.dispatchEvent(
                new Event(
                    type === "plan"
                        ? "planUpdated"
                        : "savedUpdated"
                )
            );

            onUpdate();

            showToast(
                type === "plan"
                    ? "Workout removed from today's plan."
                    : "Workout removed from saved."
            );
        } catch {
            showToast("Unable to remove workout.");
        }
    };

    const handleDone = () => {
        showToast(`${workout.name} marked as done!`);
    };

    return (
        <>
            <article className="overflow-hidden rounded-xl border border-white/10 bg-[#15181e]">
                <div className="flex flex-col gap-5 p-5 sm:flex-row">

                    {/* Image */}
                    <div className="h-48 w-full shrink-0 overflow-hidden rounded-lg sm:h-36 sm:w-44">
                        <img
                            src={workout.image}
                            alt={workout.name}
                            className="h-full w-full object-cover"
                        />
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col">

                        {/* Title */}
                        <div>
                            <h2 className="text-xl font-black uppercase text-white">
                                {workout.name}
                            </h2>

                            <p className="mt-1 text-xs text-gray-500">
                                {workout.equipment}
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-400">
                            <span>
                                ⏱ {workout.duration} min
                            </span>

                            <span>
                                🔥 {workout.caloriesBurned} kcal
                            </span>

                            <span>
                                ★ {workout.rating}
                            </span>
                        </div>

                        {/* Actions */}
                        <div className="mt-5 flex flex-wrap gap-2">

                            <Link
                                href={`/workout/${workout.id}`}
                                className="rounded-lg border border-white/10 px-4 py-2 text-xs font-bold text-white transition hover:border-[#ccff00] hover:text-[#ccff00]"
                            >
                                View Details
                            </Link>

                            {type === "plan" && (
                                <button
                                    onClick={handleDone}
                                    className="rounded-lg bg-[#ccff00] px-4 py-2 text-xs font-black text-black transition hover:bg-[#b8eb00]"
                                >
                                    ✓ Mark as Done
                                </button>
                            )}

                            <button
                                onClick={handleRemove}
                                className="rounded-lg border border-red-500/20 px-4 py-2 text-xs font-bold text-red-400 transition hover:bg-red-500/10"
                                aria-label={`Remove ${workout.name}`}
                            >
                                ✕
                            </button>

                        </div>
                    </div>
                </div>
            </article>

            {/* Toast */}
            {message && (
                <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg border border-[#ccff00]/30 bg-[#15181e] px-5 py-3 text-sm font-bold text-white shadow-xl">
                    {message}
                </div>
            )}
        </>
    );
}