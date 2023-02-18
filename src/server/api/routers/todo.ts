import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const todoRouter = createTRPCRouter({
  addTodo: protectedProcedure
    .input(z.object({ description: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const todo = await ctx.prisma.todo.create({
        data: {
          ...input,
          userId: ctx.session.user.id,
        },
      });
      return {
        ...todo,
      };
    }),

  findAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.todo.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
});
