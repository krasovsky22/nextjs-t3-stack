import { useRef, useState } from "react";
import {
  Flex,
  FormLabel,
  IconButton,
  NumberInput,
  FormControl,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Input,
  Button,
} from "@chakra-ui/react";

import {
  Controller,
  useForm,
  type SubmitHandler,
  useFieldArray,
} from "react-hook-form";
import { TbMinus } from "react-icons/tb";
import withChakra from "@utils/withChakra";

interface ExerciseSetType {
  weight: number;
  repeates: number;
}

interface ExerciseType {
  name: string;
  sets: ExerciseSetType[];
}

interface WorkoutType {
  name: string;
  date: string;
  exercises: ExerciseType[];
}

// date comes as isostring
const WorkoutForm: React.FC<{ date: string }> = ({ date }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
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

  //   const [exercises, setExercises] = useState<Map<number, ExerciseType>>(
  //     new Map()
  //   );

  //   const addExercise = () => {
  //     setExercises((prevExercises) =>
  //       new Map(prevExercises).set(prevExercises.size, { name: "", sets: [] })
  //     );
  //   };

  //   const removeExercise = (index: number) => {
  //     console.log("removing", index);
  //     setExercises((prevExercises) => {
  //       const nextMap = new Map(prevExercises);

  //       nextMap.delete(index);
  //       return nextMap;
  //     });
  //   };

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

        {exercisesFields.map((exercieField, index) => {
          return (
            <Flex key={exercieField.id} gap={3} alignItems="center">
              <FormControl flex={10}>
                <FormLabel>Name</FormLabel>
                <Controller
                  key={index}
                  name={`exercises.${index}.name`}
                  control={control}
                  render={({ field }) => {
                    return <Input type="text" {...field} />;
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
          );
        })}

        <Flex justifyContent="space-between">
          <Button
            colorScheme="green"
            variant="solid"
            onClick={() => addExercise({ name: "", sets: [] })}
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
