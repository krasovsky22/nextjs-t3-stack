export interface OptionType {
  label: string;
  value: string;
}
export interface ExerciseSetType {
  weight?: number;
  repeats?: number;
  weightType: "kg" | "lb";
}

export interface WorkoutExerciseType {
  exercise: OptionType | null;
  workoutSets: ExerciseSetType[];
}

export interface WorkoutType {
  name: string;
  workoutDate: string;
  workoutExercises: WorkoutExerciseType[];
}
