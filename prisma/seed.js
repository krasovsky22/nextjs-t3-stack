require("dotenv").config();
const fetch = require("node-fetch");
const querystring = require("node:querystring");
const { PrismaClient } = require("@prisma/client");
const { PromisePool } = require("@supercharge/promise-pool");

const prisma = new PrismaClient();

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.EXERCISE_RAPID_API_KEY ?? "",
    "X-RapidAPI-Host": process.env.EXERCISE_RAPID_API_HOST ?? "",
  },
};

const fetchMuscleGroups = async () => {
  console.log("Fetching muscle groups.");
  const response = await fetch(
    "https://exerciseapi3.p.rapidapi.com/search/muscles/",
    options
  );
  const data = await response.json();

  return data;
};

const fetchExerciseByMuscleType = async (queryObj) => {
  console.log(`Fetching exercises for ${JSON.stringify(queryObj)}.`);

  const url =
    "https://exerciseapi3.p.rapidapi.com/search/?" +
    querystring.stringify({ ...queryObj });

  const response = await fetch(url, options);
  return response.json();
};

const load = async () => {
  try {
    console.log("Pruning Muscle Groups.");
    await prisma.muscleGroup.deleteMany();
    console.log("Pruning Exercises.");
    await prisma.exercise.deleteMany();

    const muscleGroups = await fetchMuscleGroups();

    // store muscle groups.
    await prisma.muscleGroup.createMany({
      data: muscleGroups.map((muscleGroup) => ({
        name: muscleGroup,
      })),
    });

    const storedMuscleGroups = await prisma.muscleGroup.findMany();
    await PromisePool.for(storedMuscleGroups)
      .withConcurrency(1)
      .process(async ({ name }) => {
        const primaryMuscleGroupExcercises = await fetchExerciseByMuscleType({
          primaryMuscle: name,
        });
        const secondaryMuscleGroupExcersices = await fetchExerciseByMuscleType({
          secondaryMuscle: name,
        });

        await PromisePool.for([
          ...primaryMuscleGroupExcercises,
          ...secondaryMuscleGroupExcersices,
        ])
          .withConcurrency(1)
          .process(async (apiExcercise) => {
            const storedExercise = await prisma.exercise.findUnique({
              where: {
                name: apiExcercise.Name,
              },
            });

            if (storedExercise) {
              return;
            }

            // not stored, create new
            const primaryMuscles = apiExcercise["Primary Muscles"];
            const secondaryMuscles = apiExcercise["SecondaryMuscles"];

            try {
              await prisma.exercise.create({
                data: {
                  type: apiExcercise.Type,
                  name: apiExcercise.Name,
                  force: apiExcercise.Force,
                  youtubeLink: apiExcercise["Youtube link"],
                  workoutTypes: apiExcercise["Workout Type"],
                  primaryMuscles: {
                    connect: storedMuscleGroups
                      .filter((storedMuscleGroup) =>
                        primaryMuscles.includes(storedMuscleGroup.name)
                      )
                      .map((muscle) => ({ id: muscle.id })),
                  },
                  secondaryMuscles: {
                    connect: storedMuscleGroups
                      .filter((storedMuscleGroup) =>
                        secondaryMuscles.includes(storedMuscleGroup.name)
                      )
                      .map((muscle) => ({ id: muscle.id })),
                  },
                },
              });
            } catch (e) {
              console.log("e", e);
            }
           
          });
      });
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
    console.info("Completed");
  }
};

void load();
