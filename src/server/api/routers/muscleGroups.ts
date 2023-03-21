import { createTRPCRouter, publicProcedure } from "../trpc";

export const muscleGroupsRouter = createTRPCRouter({
  findAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.muscleGroup.findMany();
  }),
});
