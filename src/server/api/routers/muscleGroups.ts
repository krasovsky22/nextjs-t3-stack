import { z } from "zod";
import fetchMuscleGroups from "../external/fetchMuscleGroups";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const muscleGroupsRouter = createTRPCRouter({
  findAll: protectedProcedure.query(async ({ ctx }) => {
    const dbMuscleGroups = await ctx.prisma.muscleGroup.findMany();

    if (dbMuscleGroups.length > 0) {
      return dbMuscleGroups;
    }

    console.log("No muscle groups found. Fetchin from external api.");
    // fetch from external api and populate our database
    const externalMuscleGroups = await fetchMuscleGroups();

    await ctx.prisma.muscleGroup.createMany({
      data: externalMuscleGroups.map((groupName) => ({
        name: groupName,
      })),
    });

    return ctx.prisma.muscleGroup.findMany();
  }),
});
