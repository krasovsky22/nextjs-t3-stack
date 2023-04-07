"use client";
import { useState } from "react";

import { Flex, Button, Spinner } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { BsGithub } from "react-icons/bs";
import withChakra from "@utils/withChakra";
const GithubButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const toggleLogin = () => {
    setIsLoading(true);
    void signIn("github");
  };
  return (
    <Flex gap={5} alignItems="center">
      <Button
        leftIcon={<BsGithub />}
        rightIcon={
          isLoading ? (
            <Spinner speed="0.65s" size="xl" height="25px" width="25px" />
          ) : undefined
        }
        onClick={toggleLogin}
      >
        Log in with Github
      </Button>
    </Flex>
  );
};

export default withChakra(GithubButton);
