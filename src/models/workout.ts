import { z } from "zod";

const WorkoutSet = z.object({
  weight: z.number().multipleOf(0.1),
  weightType: z.enum(["lb", "kg"]),
  repeats: z.number(),
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
