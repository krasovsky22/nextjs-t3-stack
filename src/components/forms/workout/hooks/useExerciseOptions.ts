import { api } from "@utils/api";
import { useEffect } from "react";
import { type OptionType } from "../types";

let exercisesOptionsCache: OptionType[] = [];

const useExerciseOptions = () => {
  const { data: exercises, isLoading } = api.exercises.findAll.useQuery(
    undefined,
    { enabled: exercisesOptionsCache.length === 0 }
  );

  useEffect(() => {
    console.log("use Effect");
    const options =
      exercises?.map((exercise) => ({
        label: exercise.name,
        value: exercise.id,
      })) ?? [];

    if (options.length > 0) {
      exercisesOptionsCache = options;
    }
  }, [exercises]);

  return {
    options: exercisesOptionsCache,
    isLoading,
  };
};

export default useExerciseOptions;
