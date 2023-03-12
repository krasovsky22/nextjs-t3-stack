import { type NextPage } from "next";
import Link from "next/link";

import { Flex, Text } from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
    <Flex flexDir="column">
      <Text>Home Page</Text>
      <Link href="/todos">Todos</Link>
      <Link href="/dashboard">Dashboard</Link>
    </Flex>
  );
};

export default Home;
