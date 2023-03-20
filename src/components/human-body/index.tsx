import { Box } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

import FrontBody from "./front";

const HumanBody = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onMouseOver = (event: MouseEvent) => {
      const target = event.target as SVGElement;
      if (target.parentElement?.id) {
        target.parentElement.querySelectorAll("path").forEach((path) => {
          path.style.fill = "red";
        });
      }
    };

    const onMouseLeave = (event: MouseEvent) => {
      const target = event.target as SVGElement;
      if (target.parentElement?.id) {
        target.parentElement.querySelectorAll("path").forEach((path) => {
          path.style.fill = "currentColor";
        });
      }
    };

    ref.current?.addEventListener("mouseover", onMouseOver);
    ref.current?.addEventListener("mouseout", onMouseLeave);

    return () => {
      ref.current?.removeEventListener("mouseover", onMouseOver);
      ref.current?.removeEventListener("mouseout", onMouseLeave);
    };
  }, []);
  return (
    <Box flex="1" position="relative" h="100%" ref={ref}>
      <FrontBody />
    </Box>
  );
};

export default HumanBody;
