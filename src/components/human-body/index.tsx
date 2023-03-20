import { Box, Text, Tooltip } from "@chakra-ui/react";
import { debounce } from "lodash";
import { useEffect, useRef, useState } from "react";

import FrontBody from "./front";

const HumanBody = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const [tooltip, setTooltip] = useState<string | null>(null);

  useEffect(() => {
    const element = ref.current as HTMLDivElement;

    const onMouseOver = (event: MouseEvent) => {
      const target = event.target as SVGElement;
      const tooltip = textRef.current;
      if (target.parentElement?.id) {
        setTooltip(target.parentElement?.id);
        // if (tooltip) {
        //   const title = target.parentElement?.id;

        //   tooltip.innerHTML = title;
        //   tooltip.style.display = "block";
        //   tooltip.style.left = `${event.offsetX - 20}px`;
        //   tooltip.style.top = `${event.offsetY - 20}px`;
        // }

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

        setTooltip(null);

        // if (textRef.current) {
        //   textRef.current.style.display = "none";
        // }
      }
    };

    console.log("adding event listener");
    element?.addEventListener("mouseover", onMouseOver);
    element?.addEventListener("mouseout", onMouseLeave);

    return () => {
      element?.removeEventListener("mouseover", onMouseOver);
      element?.removeEventListener("mouseout", onMouseLeave);
    };
  }, []);
  return (
    <Tooltip isOpen label={tooltip} placement="top">
      <Box flex="1" position="relative" ref={ref} h="80%">
        <Box h="100%" position="relative">
          <FrontBody />
        </Box>
      </Box>
    </Tooltip>
  );
};

export default HumanBody;
