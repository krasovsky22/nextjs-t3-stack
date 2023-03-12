import { Button, Stack } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { BsGithub } from "react-icons/bs";

const GithubButton = () => {
  return (
    <Button leftIcon={<BsGithub />} onClick={() => void signIn("github")}>
      Log in with Github
    </Button>
  );
};

export default GithubButton;
