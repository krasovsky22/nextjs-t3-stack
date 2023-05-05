import { Container, Spinner } from "@chakra-ui/react";

type LoadingProps = {
  status?: string;
};

const Loading = ({ status = "Loading..." }: LoadingProps) => {
  return (
    <Container
      my={5}
      gap={3}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Spinner size="md" emptyColor="gray.200" />
      {status}
    </Container>
  );
};

export default Loading;
