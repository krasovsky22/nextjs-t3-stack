import { type NextPage } from "next";

import { Flex } from "@chakra-ui/react";
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
