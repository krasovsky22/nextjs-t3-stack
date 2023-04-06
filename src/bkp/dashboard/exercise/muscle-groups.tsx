import { api } from "@utils/api";
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";

const MuscleGroups = () => {
  const { data: muscleGroups } = api.muscleGroups.findAll.useQuery();
  console.log("here", muscleGroups);
  return (
    <Container width="full">
      <Heading>Muscle Groups</Heading>
      <Flex flexDir="column" gap={1}>
        {muscleGroups?.map((muscleGroup) => (
          <Box key={muscleGroup.id}>
            <Text>{muscleGroup.name}</Text>
          </Box>
        ))}
      </Flex>
    </Container>
  );
};

export default MuscleGroups;

MuscleGroups.requireAuth = true;
