import { z } from "zod";

const WorkoutSet = z.object({
  weight: z.string(),
  weightType: z.enum(["lb", "kg"]),
  repeats: z.string(),
});

const WorkoutExercise = z.object({
  exerciseId: z.string().nonempty(),
  workoutSets: z.array(WorkoutSet),
});

export const CreateWorkoutInput = z.object({
  name: z.string().nonempty(),
  workoutDate: z.string().nonempty(),
  workoutExercises: z.array(WorkoutExercise),
});

export type CreateWorkoutInputType = z.infer<typeof CreateWorkoutInput>;
