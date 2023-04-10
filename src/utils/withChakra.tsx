"use client";

import { useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { CacheProvider } from "@chakra-ui/next-js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const withChakra = <T extends object>(Component: React.ComponentType<T>) => {
  // eslint-disable-next-line react/display-name
  return (props: T) => {
    // do isMount check o
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    if (!isMounted) {
      return null;
    }

    return (
      <ChakraProvider resetCSS>
        <Component {...props} />
      </ChakraProvider>
    );
  };
};

export default withChakra;
