import Link from "next/link";
import type { Workout } from "@/types/workout";

interface WorkoutCardProps {
    workout: Workout;
}

export default function WorkoutCard({
    workout,
}: WorkoutCardProps) {
    return (
        <article className="group overflow-hidden rounded-xl border border-white/10 bg-[#15181e] transition duration-300 hover:-translate-y-1 hover:border-[#ccff00]/40">

            {/* Image */}
            <div className="relative h-56 overflow-hidden">
                <img
                    src={workout.image}
                    alt={workout.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                {/* Difficulty */}
                <div className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/70 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-[#ccff00] backdrop-blur-sm">
                    {workout.difficulty}
                </div>

                {/* Rating */}
                <div className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
                    ★ {workout.rating}
                </div>
            </div>

            {/* Content */}
            <div className="p-5">

                {/* Title */}
                <h3 className="text-xl font-black uppercase tracking-tight text-white">
                    {workout.name}
                </h3>

                {/* Muscle Groups */}
                <div className="mt-3 flex flex-wrap gap-2">
                    {workout.muscleGroups.map(
                        (muscle) => (
                            <span
                                key={muscle}
                                className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-bold uppercase text-gray-400"
                            >
                                {muscle}
                            </span>
                        )
                    )}
                </div>

                {/* Stats */}
                <div className="mt-5 grid grid-cols-3 gap-2 border-y border-white/10 py-4 text-center">

                    <div>
                        <p className="text-sm font-black text-white">
                            {workout.duration}
                        </p>

                        <p className="mt-1 text-[10px] uppercase text-gray-500">
                            Min
                        </p>
                    </div>

                    <div>
                        <p className="text-sm font-black text-white">
                            {workout.caloriesBurned}
                        </p>

                        <p className="mt-1 text-[10px] uppercase text-gray-500">
                            Kcal
                        </p>
                    </div>

                    <div>
                        <p className="text-sm font-black text-white">
                            {workout.sets}
                        </p>

                        <p className="mt-1 text-[10px] uppercase text-gray-500">
                            Sets
                        </p>
                    </div>

                </div>

                {/* Button */}
                <Link
                    href={`/workout/${workout.id}`}
                    className="mt-5 flex w-full items-center justify-center rounded-lg bg-[#ccff00] px-4 py-3 text-xs font-black uppercase text-black transition hover:bg-[#b8eb00]"
                >
                    View Details →
                </Link>
            </div>
        </article>
    );
}