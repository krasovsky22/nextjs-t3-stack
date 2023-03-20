import { type NextPage } from "next";
import Link from "next/link";

import { Flex, Text, Box } from "@chakra-ui/react";
import HumanBody from "@components/human-body";

const Home: NextPage = () => {
  return (
    <Flex height="100%">
      <Flex flexDir="column">
        <Text>Home Page</Text>
        <Link href="/todos">Todos</Link>
        <Link href="/dashboard">Dashboard</Link>
      </Flex>
      <Flex flexGrow="1" gap="1" alignItems="center" justifyContent="center">
        <Box flex="1"></Box>
        <HumanBody />
        <HumanBody />
        <Box flex="1"></Box>
      </Flex>
    </Flex>
  );
};

export default Home;
