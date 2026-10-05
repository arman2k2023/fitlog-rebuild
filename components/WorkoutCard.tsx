import Link from "next/link";
import type { Workout } from "@/types/workout";

interface WorkoutCardProps {
    workout: Workout;
}

export default function WorkoutCard({
    workout,
}: WorkoutCardProps) {
    return (
        <Link
            href={`/workout/${workout.id}`}
            className="group overflow-hidden rounded-xl border border-white/10 bg-[#15181e] transition hover:-translate-y-1 hover:border-[#ccff00]/40"
        >
            {/* Image */}
            <div className="relative h-56 overflow-hidden">
                <img
                    src={workout.image}
                    alt={workout.name}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
            </div>

            {/* Content */}
            <div className="p-5">

                {/* Muscle Tags */}
                <div className="mb-3 flex flex-wrap gap-2">
                    {workout.muscleGroups.map((muscle) => (
                        <span
                            key={muscle}
                            className="rounded-full bg-[#ccff00] px-2.5 py-1 text-[9px] font-black uppercase text-black"
                        >
                            {muscle}
                        </span>
                    ))}
                </div>

                {/* Workout Name */}
                <h3 className="text-xl font-black uppercase text-white">
                    {workout.name}
                </h3>

                {/* Equipment */}
                <p className="mt-2 text-xs text-gray-500">
                    {workout.equipment}
                </p>

                {/* Stats */}
                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-gray-400">
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

            </div>
        </Link>
    );
}