import { createTRPCRouter, protectedProcedure } from "../trpc";

export const exercisesRouter = createTRPCRouter({
  findAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.exercise.findMany();
  }),
});
