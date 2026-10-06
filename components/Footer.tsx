import Image from "next/image";

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-[#080808]">
            <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between">

                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Image
                        src="/logo.png"
                        alt="FitLog Logo"
                        width={38}
                        height={38}
                        className="h-9 w-9 object-contain"
                    />

                    <span className="text-xl font-black tracking-tight text-white">
                        FITLOG
                    </span>
                </div>

                {/* Copyright */}
                <p className="text-xs text-gray-500">
                    © 2026 FitLog — Workout Library. Train hard, log honest.
                </p>

            </div>
        </footer>
    );
}