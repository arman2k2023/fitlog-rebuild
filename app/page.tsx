import Hero from "@/components/Hero";
import WorkoutLibrary from "@/components/WorkoutLibrary";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080808]">
      <Hero />
      <WorkoutLibrary />
    </main>
  );
}