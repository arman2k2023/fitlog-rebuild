import WorkoutDetail from "@/components/WorkoutDetail";

interface WorkoutPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function WorkoutPage({
    params,
}: WorkoutPageProps) {
    const { id } = await params;

    const response = await fetch(
        `https://api.abcz.workers.dev/api/fitlog/${id}`,
        {
            cache: "no-store",
        }
    );

    if (!response.ok) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#0b0d10] px-6">
                <div className="text-center">
                    <h1 className="text-3xl font-black uppercase text-white">
                        Workout Not Found
                    </h1>

                    <p className="mt-3 text-sm text-gray-500">
                        The workout you are looking for does not exist.
                    </p>
                </div>
            </main>
        );
    }

    const data = await response.json();

    const workout = data?.data ?? data;

    return <WorkoutDetail workout={workout} />;
}