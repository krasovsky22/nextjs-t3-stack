require("dotenv").config();
const fetch = require("node-fetch");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const URL = "https://exerciseapi3.p.rapidapi.com/search/muscles/";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.EXERCISE_RAPID_API_KEY ?? "",
    "X-RapidAPI-Host": process.env.EXERCISE_RAPID_API_HOST ?? "",
  },
};

const fetchMuscleGroups = async () => {
  console.log("Fetching muscle groups.");
  const response = await fetch(URL, options);
  const data = await response.json();

  return data;
};

const load = async () => {
  try {
    console.log(process.env.EXERCISE_RAPID_API_URL);
    console.log("Pruning Muscle Groups.");
    await prisma.muscleGroup.deleteMany();

    const muscleGroups = await fetchMuscleGroups();
    console.log(
      `Inserting ${muscleGroups.length} muscle groups into database.`
    );
    await prisma.muscleGroup.createMany({
      data: muscleGroups.map((groupName) => ({
        name: groupName,
      })),
    });
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
    console.info("Completed");
  }
};

void load();
