import {
  Input,
  Flex,
  Button,
  FormLabel,
  IconButton,
  FormControl,
} from "@chakra-ui/react";

import Select from "react-select";

import {
  Controller,
  useFieldArray,
  useForm,
  type SubmitHandler,
} from "react-hook-form";

import { TbMinus } from "react-icons/tb";
import { BsPlusCircle } from "react-icons/bs";
import { zodResolver } from "@hookform/resolvers/zod";

import { api } from "@utils/api";
// import { type WorkoutType } from "./types";
import { Loading } from "@components/loading";
import WorkoutExerciseField from "./fields/exercise";
import useExerciseOptions from "./hooks/useExerciseOptions";
import {
  CreateWorkoutInput,
  type CreateWorkoutInputType,
} from "@models/workout";

// date comes as isostring
const WorkoutForm: React.FC<{ date: string }> = ({ date }) => {
  const { options, isLoading } = useExerciseOptions();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateWorkoutInputType>({
    defaultValues: {
      name: "",

      // make it yyyy-mm-dd
      workoutDate: date.split("T")[0],
      workoutExercises: [],
    },
    resolver: zodResolver(CreateWorkoutInput),
  });

  const {
    fields: exercisesFields,
    append: addExercise,
    remove: removeExercise,
  } = useFieldArray({
    control,
    name: "workoutExercises",
  });

  const createWorkoutExerciseMutation =
    api.workouts.createWorkoutExercise.useMutation();

  const onSubmit: SubmitHandler<CreateWorkoutInputType> = (workoutFormData) => {
    // const { name, workoutDate, workoutExercises } = workoutFormData;

    console.log("form submit", workoutFormData);

    createWorkoutExerciseMutation.mutate({ ...workoutFormData });
  };

  console.log("error", errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDir="column" gap={3}>
        <Flex gap={3}>
          <FormControl flex={3}>
            <FormLabel>Workout Name</FormLabel>
            <Controller
              name="name"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    isInvalid={!!errors.name?.message}
                    placeholder={errors.name?.message}
                  />
                );
              }}
            />
          </FormControl>

          <FormControl flex={1}>
            <FormLabel>Date</FormLabel>
            <Controller
              name="workoutDate"
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
                  <FormLabel>{`Exercise ${index + 1}`}</FormLabel>
                  <Controller
                    key={index}
                    name={`workoutExercises.${index}.exerciseId`}
                    control={control}
                    rules={{ required: "Please select a Exercise" }}
                    render={({ field }) => {
                      return (
                        <Select
                          onChange={(selectedOption) =>
                            field.onChange(selectedOption?.value ?? "")
                          }
                          options={options}
                          noOptionsMessage={() => "No results found"}
                        />
                      );
                    }}
                  />
                </FormControl>

                <IconButton
                  mt="30px"
                  size="sm"
                  icon={<TbMinus />}
                  aria-label="Remove Exercise"
                  colorScheme="orange"
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
            leftIcon={<BsPlusCircle />}
            colorScheme="green"
            variant="solid"
            onClick={() => addExercise({ exerciseId: "", workoutSets: [] })}
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

export default WorkoutForm;
