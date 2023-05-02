import {
  Flex,
  Select,
  FormControl,
  FormLabel,
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
} from "@chakra-ui/react";
import { Controller, useFieldArray, type Control } from "react-hook-form";
import { TbMinus } from "react-icons/tb";
import { type WorkoutType } from "../types";

interface WorkoutExerciseFieldType{
  index: number;
  control: Control<WorkoutType>;
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
    name: `exercises.${index}.sets`,
  });

  return (
    <>
      <Flex flexDir="column" gap={1} width="100%">
        {setsFields.map((setField, indexIndex) => {
          return (
            <Flex key={setField.id} width="100%" justifyContent="space-between">
              <Flex gap={3} alignItems="center" justifyContent="space-evenly">
                <FormControl flex={10}>
                  {indexIndex === 0 && <FormLabel>Weight</FormLabel>}
                  <Controller
                    key={index}
                    name={`exercises.${index}.sets.${indexIndex}.weight`}
                    control={control}
                    render={({ field }) => {
                      return (
                        <NumberInput
                          size="sm"
                          min={0}
                          step={1}
                          max={100}
                          defaultValue={field.value}
                        >
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
                  {indexIndex === 0 && <FormLabel>Type</FormLabel>}
                  <Controller
                    key={index}
                    name={`exercises.${index}.sets.${indexIndex}.weightType`}
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
                  {indexIndex === 0 && <FormLabel>Repeates</FormLabel>}
                  <Controller
                    key={index}
                    name={`exercises.${index}.sets.${indexIndex}.repeates`}
                    control={control}
                    render={({ field }) => {
                      return (
                        <NumberInput
                          min={0}
                          step={1}
                          max={100}
                          size="sm"
                          defaultValue={field.value}
                        >
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
                <IconButton
                  alignSelf="flex-end"
                  icon={<TbMinus />}
                  aria-label="Remove Set"
                  colorScheme="red"
                  onClick={() => removeSet(indexIndex)}
                >
                  Remove Exercise
                </IconButton>
              </Flex>

              {indexIndex === setsFields.length - 1 && (
                <Button
                    alignSelf="end"
                  colorScheme="green"
                  variant="solid"
                  onClick={() => addSet({ weightType: "kg" })}
                >
                  Add Set
                </Button>
              )}
            </Flex>
          );
        })}
      </Flex>
      {setsFields.length === 0 && (
        <Button
          colorScheme="green"
          variant="solid"
          onClick={() => addSet({ weightType: "kg" })}
        >
          Add Set
        </Button>
      )}
    </>
  );
};

export default WorkoutExerciseField;
