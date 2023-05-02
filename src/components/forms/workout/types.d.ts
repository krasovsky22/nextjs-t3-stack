export interface OptionType {
  label: string;
  value: string;
}
export interface ExerciseSetType {
  weight?: number;
  repeates?: number;
  weightType: "kg" | "lb";
}

export interface ExerciseType {
  name: OptionType | null;
  sets: ExerciseSetType[];
}

export interface WorkoutType {
  name: string;
  date: string;
  exercises: ExerciseType[];
}
