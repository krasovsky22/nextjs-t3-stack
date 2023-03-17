import { createTRPCRouter, protectedProcedure } from "../trpc";

export const muscleGroupsRouter = createTRPCRouter({
  findAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.muscleGroup.findMany();
  }),
});
