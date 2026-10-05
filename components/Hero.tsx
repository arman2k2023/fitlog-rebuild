import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="px-4 py-8 sm:px-6 sm:py-10">
            <div className="relative mx-auto min-h-[300px] max-w-7xl overflow-hidden rounded-xl border border-white/10 bg-[#15181e] sm:min-h-[360px]">

                {/* Left Content */}
                <div className="relative z-10 flex min-h-[300px] max-w-xl flex-col justify-center px-6 py-10 sm:min-h-[360px] sm:px-10 lg:px-12">

                    <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#ccff00] sm:text-xs">
                        Workout Library
                    </p>

                    <h1 className="max-w-[500px] text-4xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Train With Intent.
                        <br />
                        Log Every Set.
                    </h1>

                    <p className="mt-5 max-w-[500px] text-xs leading-5 text-gray-400 sm:text-sm sm:leading-6">
                        FitLog is a dark, no-nonsense gym companion:
                        pick a lift, lock it into today's plan, and watch
                        the week's work add up.
                    </p>

                    <Link
                        href="#library"
                        className="mt-6 inline-flex w-fit items-center gap-2 rounded-md bg-[#ccff00] px-5 py-2.5 text-[10px] font-black text-black transition hover:bg-[#b8eb00] sm:text-xs"
                    >
                        BROWSE WORKOUTS
                        <span className="text-sm">→</span>
                    </Link>
                </div>

                {/* Character Image */}
                <div className="pointer-events-none absolute bottom-0 right-4 h-[280px] w-[280px] sm:right-8 sm:h-[330px] sm:w-[330px] lg:right-12 lg:h-[350px] lg:w-[350px]">
                    <Image
                        src="/banner.png"
                        alt="Workout character"
                        fill
                        priority
                        className="object-contain object-bottom"
                    />
                </div>

            </div>
        </section>
    );
}