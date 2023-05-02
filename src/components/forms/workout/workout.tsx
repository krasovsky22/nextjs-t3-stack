"use client";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
} from "@chakra-ui/react";

import Select from "react-select";

import {
  Controller,
  useFieldArray,
  useForm,
  type SubmitHandler,
} from "react-hook-form";
import { TbMinus } from "react-icons/tb";
import { type WorkoutType } from "./types";
import useExerciseOptions from "./hooks/useExerciseOptions";
import Loading from "@components/loading/loading";
import WorkoutExerciseField from "./fields/exercise";
import withChakra from "@utils/withChakra";

// date comes as isostring
const WorkoutForm: React.FC<{ date: string }> = ({ date }) => {
  const { options, isLoading } = useExerciseOptions();

  const {
    control,
    handleSubmit,
    // formState: { errors },
  } = useForm<WorkoutType>({
    defaultValues: {
      name: "",

      // make it yyyy-mm-dd
      date: date.split("T")[0],
      exercises: [],
    },
  });

  const {
    fields: exercisesFields,
    append: addExercise,
    remove: removeExercise,
  } = useFieldArray({
    control,
    name: "exercises",
  });

  const onSubmit: SubmitHandler<WorkoutType> = (data) => {
    console.log(JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDir="column" gap={3}>
        <Flex gap={3}>
          <FormControl flex={3}>
            <FormLabel>Workout Name</FormLabel>
            <Controller
              name="name"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </FormControl>

          <FormControl flex={1}>
            <FormLabel>Date</FormLabel>
            <Controller
              name="date"
              control={control}
              render={({ field }) => {
                return <Input type="date" {...field} />;
              }}
            />
          </FormControl>
        </Flex>

        {isLoading && <Loading status="Loading exercises..." />}

        {exercisesFields.map((exercieField, index) => {
          return (
            <Flex flexDir="column" gap="1" key={exercieField.id}>
              <Flex gap={3} alignItems="center">
                <FormControl flex={10}>
                  <FormLabel>Name</FormLabel>
                  <Controller
                    key={index}
                    name={`exercises.${index}.name`}
                    control={control}
                    render={({ field }) => {
                      return (
                        <Select
                          {...field}
                          options={options}
                          noOptionsMessage={() => "No results found"}
                        />
                      );
                    }}
                  />
                </FormControl>

                <IconButton
                  mt="30px"
                  icon={<TbMinus />}
                  aria-label="Remove Exercise"
                  colorScheme="red"
                  onClick={() => removeExercise(index)}
                >
                  Remove Exercise
                </IconButton>
              </Flex>
              <Flex>
                <WorkoutExerciseField index={index} {...{ control }} />
              </Flex>
            </Flex>
          );
        })}

        <Flex justifyContent="space-between">
          <Button
            colorScheme="green"
            variant="solid"
            onClick={() => addExercise({ name: null, sets: [] })}
          >
            Add Exercise
          </Button>
          <Button type="submit" colorScheme="teal" variant="solid">
            Submit
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};

export default withChakra(WorkoutForm);
