import { CreateWorkoutInput } from "@models/workout";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const workoutsRouter = createTRPCRouter({
  createWorkoutExercise: protectedProcedure
    .input(CreateWorkoutInput)
    .mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    const { name, workoutDate, workoutExercises } = input;


      const tObject = {
        data: {
          name,
          workoutDate: new Date(workoutDate),
          user: {
            connect: { id: userId },
          },
          workoutExercises: {
            create: workoutExercises.map((workoutExercise) => {
              return {
                exercise: {
                  connect: { id: workoutExercise.exerciseId },
                },
                user: {
                  connect: { id: userId },
                },
                workoutExerciseSets: {
                  create: workoutExercise.workoutSets.map((set) => {
                    return {
                      ...set,
                    };
                  }),
                },
              };
            }),
          },
        },
        include: {
          workoutExercises: {
            include: {
              workoutExerciseSets: true,
            },
          },
        },
      };

      const workout = await ctx.prisma.workout.create(tObject);

      return workout;
    
    }),
  findAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.exercise.findMany();
  }),
});
