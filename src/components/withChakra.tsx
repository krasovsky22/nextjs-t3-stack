"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { CacheProvider } from "@chakra-ui/next-js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const withChakra = <T extends object>(Component: React.ComponentType<T>) => {
  // eslint-disable-next-line react/display-name
  return (props: T) => (
    <CacheProvider>
      <ChakraProvider>
        <Component {...props} />
      </ChakraProvider>
    </CacheProvider>
  );
};

export default withChakra;
