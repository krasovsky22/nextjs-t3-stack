import fetch from "node-fetch";
import { env } from "@/env/server.mjs";

const url = env.EXERCISE_RAPID_API_URL;

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": env.EXERCISE_RAPID_API_KEY,
    "X-RapidAPI-Host": env.EXERCISE_RAPID_API_HOST,
  },
};

const fetchMuscleGroups = async (): Promise<string[]> => {
  const response = await fetch(url, options);
  const data = (await response.json()) as string[];

  return data;
};

export default fetchMuscleGroups;
