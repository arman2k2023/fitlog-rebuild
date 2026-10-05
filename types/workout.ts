export interface Workout {
    id: number;
    name: string;
    image: string;
    description: string;
    muscleGroups: string[];
    equipment: string[];
    difficulty: string;
    duration: number;
    caloriesBurned: number;
    sets: number;
    reps: string;
    rating: number;
    instructions: string[];
}