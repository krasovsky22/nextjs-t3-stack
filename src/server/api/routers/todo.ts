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

  removeTodo: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      console.log("here", input);
      const todo = await ctx.prisma.todo.findFirstOrThrow({
        where: { id: input.id, userId: ctx.session.user.id },
      });

      if (todo) {
        await ctx.prisma.todo.delete({
          where: { id: input.id },
        });
      }

      return {
        success: true,
      };
    }),
});
