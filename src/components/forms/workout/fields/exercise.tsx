import {
  Flex,
  Select,
  Button,
  FormLabel,
  IconButton,
  NumberInput,
  FormControl,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { TbMinus } from "react-icons/tb";
import { type CreateWorkoutInputType } from "@models/workout";
import { Controller, useFieldArray, type Control } from "react-hook-form";

interface WorkoutExerciseFieldType {
  index: number;
  control: Control<CreateWorkoutInputType>;
}

const WorkoutExerciseField: React.FC<WorkoutExerciseFieldType> = ({
  index,
  control,
}) => {
  const {
    fields: setsFields,
    append: addSet,
    remove: removeSet,
  } = useFieldArray({
    control,
    name: `workoutExercises.${index}.workoutSets`,
  });

  return (
    <>
      {setsFields.length === 0 && (
        <Button
          colorScheme="green"
          variant="solid"
          onClick={() => addSet({ weightType: "kg", weight: "", repeats: "" })}
        >
          Add Set
        </Button>
      )}
      <Flex flexDir="column" gap={1} width="100%">
        {setsFields.map((setField, setIndex) => {
          return (
            <Flex key={setField.id} width="100%" justifyContent="space-between">
              <Flex gap={3} alignItems="center" justifyContent="space-evenly">
                <FormControl flex={10}>
                  {setIndex === 0 && <FormLabel>Weight</FormLabel>}
                  <Controller
                    key={index}
                    name={`workoutExercises.${index}.workoutSets.${setIndex}.weight`}
                    control={control}
                    render={({ field }) => {
                      return (
                        <NumberInput size="sm" min={0} step={1} max={100}>
                          <NumberInputField {...field} />
                          <NumberInputStepper>
                            <NumberIncrementStepper
                              onClick={() =>
                                field.onChange(+(field.value ?? 0) + 1)
                              }
                            />
                            <NumberDecrementStepper
                              onClick={() =>
                                field.onChange(+(field.value ?? 0) - 1)
                              }
                            />
                          </NumberInputStepper>
                        </NumberInput>
                      );
                    }}
                  />
                </FormControl>

                <FormControl flex={10}>
                  {setIndex === 0 && <FormLabel>Type</FormLabel>}
                  <Controller
                    key={index}
                    name={`workoutExercises.${index}.workoutSets.${setIndex}.weightType`}
                    control={control}
                    render={({ field }) => {
                      return (
                        <Select {...field} size="sm">
                          <option value="lb">LB</option>
                          <option value="kg">KG</option>
                        </Select>
                      );
                    }}
                  />
                </FormControl>

                <FormControl flex={10}>
                  {setIndex === 0 && <FormLabel>Repeats</FormLabel>}
                  <Controller
                    key={index}
                    name={`workoutExercises.${index}.workoutSets.${setIndex}.repeats`}
                    control={control}
                    render={({ field }) => {
                      return (
                        <NumberInput min={0} step={1} max={100} size="sm">
                          <NumberInputField {...field} />
                          <NumberInputStepper>
                            <NumberIncrementStepper
                              onClick={() =>
                                field.onChange(+(field.value ?? 0) + 1)
                              }
                            />
                            <NumberDecrementStepper
                              onClick={() =>
                                field.onChange(+(field.value ?? 0) - 1)
                              }
                            />
                          </NumberInputStepper>
                        </NumberInput>
                      );
                    }}
                  />
                </FormControl>
                {setIndex === setsFields.length - 1 && (
                  <Button
                    size="sm"
                    alignSelf="end"
                    colorScheme="yellow"
                    onClick={() =>
                      addSet({ weightType: "kg", weight: 0, repeats: 0 })
                    }
                  >
                    Add Set
                  </Button>
                )}
              </Flex>

              <IconButton
                size="sm"
                alignSelf="flex-end"
                icon={<TbMinus />}
                aria-label="Remove Set"
                colorScheme="red"
                onClick={() => removeSet(setIndex)}
              />
            </Flex>
          );
        })}
      </Flex>
    </>
  );
};

export default WorkoutExerciseField;
