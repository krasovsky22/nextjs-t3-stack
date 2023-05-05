import { api } from "@utils/api";
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";

const MuscleGroupsPage = () => {
  const { data: muscleGroups } = api.muscleGroups.findAll.useQuery();
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

MuscleGroupsPage.requireAuth = true;
MuscleGroupsPage.title = "MuscleGroupsPage";
MuscleGroupsPage.description = "Muscle Group Page Description";

export default MuscleGroupsPage;
