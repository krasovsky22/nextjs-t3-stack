import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { todoRouter } from "./routers/todo";
import { exercisesRouter } from "./routers/exercises";
import { muscleGroupsRouter } from "./routers/muscleGroups";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  todo: todoRouter,
  example: exampleRouter,
  exercises: exercisesRouter,
  muscleGroups: muscleGroupsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
