import { type NextPage } from "next";
import Link from "next/link";
import { api } from "@utils/api";

import { Flex, Text, Box } from "@chakra-ui/react";
import { chunk } from "lodash";
import HumanBody from "@components/humanBody";

const Home: NextPage = () => {
  return (
    <Flex className="flex h-full content-center items-center gap-10">
      <HumanBody />
      <HumanBody isBack />
    </Flex>
  );
};

export default Home;
