"use client";

import Select from "react-select";
import { capitalize, sortBy } from "lodash";
import { useCallback, useMemo, useState } from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import {
  type Options,
  type SingleValue,
} from "react-select/dist/declarations/src/types";

import { api } from "@utils/api";
import withChakra from "@utils/withChakra";

type OptionType = {
  value: string;
  label: string;
};

const ExercisePage = () => {
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string | null>(
    null
  );
  const { data: muscleGroups } =
    api.muscleGroups.findAllWithExcercies.useQuery();

  console.log(muscleGroups);

  const options: Options<OptionType> = useMemo(() => {
    return sortBy(muscleGroups ?? [], "name")?.map((muscleGroup) => {
      return { value: muscleGroup.id, label: capitalize(muscleGroup.name) };
    });
  }, [muscleGroups]);

  const onDropdownChange = useCallback((option?: SingleValue<OptionType>) => {
    if (option) {
      const { value } = option;

      setSelectedMuscleGroup(value);
    }
  }, []);

  const muscleGroup = muscleGroups?.find(
    (muscleGroup) => muscleGroup.id === selectedMuscleGroup
  );

  return (
    <div className="flex flex-col gap-3">
      <div>
        <h4>Exercise Page</h4>
      </div>
      <div className="flex gap-1">
        <Flex flex={1} flexDir="column" gap={3}>
          <Select options={options} onChange={onDropdownChange} />

          {muscleGroup && (
            <Flex flexDir="column">
              <Flex gap={3} mt={5}>
                <Box flex={1}>
                  <Heading size="md">Primary Exercises</Heading>
                  {muscleGroup.primaryMuscleExercises.map((exercise) => (
                    <Box key={exercise.id}>{exercise.name}</Box>
                  ))}
                </Box>

                <Box flex={1}>
                  <Heading size="md">Secondary Exercises</Heading>
                  {muscleGroup.secondaryMuscleExercises.map((exercise) => (
                    <Box w="full" key={exercise.id}>
                      <Text>{exercise.name}</Text>
                    </Box>
                  ))}
                </Box>
              </Flex>
            </Flex>
          )}
        </Flex>

        <div className="flex-1" />
      </div>
    </div>
  );
};

export default withChakra(api.withTRPC(ExercisePage));
