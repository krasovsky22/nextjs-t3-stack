import { type NextPage } from "next";
import Link from "next/link";
import { api } from "@utils/api";

import { Flex, Text, Box } from "@chakra-ui/react";
import HumanBody from "@components/human-body";
import { chunk } from "lodash";

const Home: NextPage = () => {


  return (
    <Flex gap="10" alignItems="center" justifyContent="center" height="100%">
      <HumanBody />
      <HumanBody isBack />
    </Flex>
  );
};

export default Home;
