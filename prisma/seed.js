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
    await PromisePool.for(muscleGroups)
      .withConcurrency(5)
      .process(async (muscleGroup) => {
        const primaryMuscleGroupExcercises = await fetchExerciseByMuscleType({
          primaryMuscle: muscleGroup,
        });
        const secondaryMuscleGroupExcersices = await fetchExerciseByMuscleType({
          secondaryMuscle: muscleGroup,
        });

        console.log(`Inserting ${muscleGroup} muscle group into database.`);
        await prisma.muscleGroup.create({
          data: {
            name: muscleGroup,
            primaryMuscleExercises: {
              create: primaryMuscleGroupExcercises.map((excercise) => {
                return {
                  type: excercise.Type,
                  name: excercise.Name,
                  force: excercise.Force,
                  youtubeLink: excercise["Youtube link"],
                  workoutTypes: excercise["Workout Type"],
                };
              }),
            },
            secondaryMuscleExercises: {
              create: secondaryMuscleGroupExcersices.map((excercise) => {
                return {
                  type: excercise.Type,
                  name: excercise.Name,
                  force: excercise.Force,
                  youtubeLink: excercise["Youtube link"],
                  workoutTypes: excercise["Workout Type"],
                };
              }),
            },
          },
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
