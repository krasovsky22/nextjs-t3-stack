import { type NextPage } from "next";
import Link from "next/link";
import { api } from "@utils/api";

import { Flex, Text, Box } from "@chakra-ui/react";
import HumanBody from "@components/human-body";
import { chunk } from "lodash";

const Home: NextPage = () => {


  return (
    <Flex height="100%">
      <Flex flexDir="column">
        <Text>Home Page</Text>
        <Link href="/todos">Todos</Link>
        <Link href="/dashboard">Dashboard</Link>
      </Flex>
      <Flex flexGrow="1" gap="1" alignItems="center" justifyContent="center">
        <HumanBody />
        <HumanBody isBack />
      </Flex>
    </Flex>
  );
};

export default Home;
