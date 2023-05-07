import { CreateWorkoutInput } from "@models/workout";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const workoutsRouter = createTRPCRouter({
  createWorkoutExercise: protectedProcedure
    .input(CreateWorkoutInput)
    .mutation(async ({ input, ctx }) => {
      console.log("asd", input);
      return { success: true, data: "test" };
    }),
  findAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.exercise.findMany();
  }),
});
