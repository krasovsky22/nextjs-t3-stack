import { useCallback, useMemo, useState } from "react";
import { api } from "@utils/api";
import { Box, Flex, Heading, Text, Tag, TagLabel } from "@chakra-ui/react";
import Select from "react-select";
import {
  type Options,
  type SingleValue,
} from "react-select/dist/declarations/src/types";
import { capitalize, sortBy } from "lodash";

type OptionType = {
  value: string;
  label: string;
};

const Exercise = () => {
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string | null>(
    null
  );
  const { data: muscleGroups } =
    api.muscleGroups.findAllWithExcercies.useQuery();

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
    <Flex as={Box} flexDir="column" gap={3}>
      <Box>
        <Heading>Exercise Page</Heading>
      </Box>
      <Flex as={Box} gap={1}>
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

        <Box flex={1}></Box>
      </Flex>
    </Flex>
  );
};

Exercise.requireAuth = true;

export default Exercise;
