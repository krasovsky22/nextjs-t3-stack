import { Box, Tooltip, Text, LinkOverlay, LinkBox } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

import BackBody from "./back";
import FrontBody from "./front";
import styles from "./humanbody.module.css";
const bodyPartClass = styles["body-map__muscle"] as string;

const HumanBody = ({ isBack = false }: { isBack?: boolean }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [tooltip, setTooltip] = useState<string | null>(null);
  const [allMuscleGroups, setAllMuscleGroups] = useState<string[]>([]);

  const handleTextMouseEnter = (muscle: string) => {
    setTooltip(muscle);
  };

  useEffect(() => {
    const element = ref.current as HTMLDivElement;

    element.querySelectorAll(`.${bodyPartClass}>path`).forEach((selector) => {
      if (selector.parentElement?.id) {
        (selector as SVGElement).style.fill = "currentColor";
      }
    });

    if (tooltip) {
      const selector = element.querySelector(`g#${tooltip}`);

      //highlight every path for that body part
      selector?.querySelectorAll("path").forEach((path) => {
        path.style.fill = "#F56565";
      });
      return;
    }
  }, [tooltip]);

  useEffect(() => {
    const element = ref.current as HTMLDivElement;

    const allBodySvgParts = Array.from(
      element.querySelectorAll(`.${bodyPartClass}`)
    )
      .map((element) => element.id)
      .filter((element) => element);
    setAllMuscleGroups(allBodySvgParts);

    const onMouseOver = (event: MouseEvent) => {
      const target = event.target as SVGElement;

      if (target.parentElement?.id) {
        setTooltip(target.parentElement?.id);
      }
    };

    const onMouseLeave = (event: MouseEvent) => {
      const target = event.target as SVGElement;
      if (target.parentElement?.id) {
        target.parentElement.querySelectorAll("path").forEach((path) => {
          path.style.fill = "currentColor";
        });

        setTooltip(null);
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
    <>
      {!isBack && (
        <Box flex="1" textAlign="end">
          {allMuscleGroups.map((muscle) => (
            <LinkBox key={muscle}>
              <LinkOverlay
                href="#"
                onMouseEnter={() => handleTextMouseEnter(muscle)}
                onMouseLeave={() => setTooltip(null)}
              >
                <Text
                  color={tooltip === muscle ? "inherit" : "gray.300"}
                  fontWeight={tooltip === muscle ? "bold" : "normal"}
                >
                  {muscle}
                </Text>
              </LinkOverlay>
            </LinkBox>
          ))}
        </Box>
      )}
      <Tooltip isOpen label={tooltip} placement="top">
        <Box flex="1" position="relative" ref={ref} h="80%">
          <Box h="100%" position="relative">
            {isBack ? (
              <BackBody className={bodyPartClass} />
            ) : (
              <FrontBody className={bodyPartClass} />
            )}
          </Box>
        </Box>
      </Tooltip>
      {isBack && (
        <Box flex="1" textAlign="start">
          {allMuscleGroups.map((muscle) => (
            <LinkBox key={muscle}>
              <LinkOverlay
                href="#"
                onMouseEnter={() => handleTextMouseEnter(muscle)}
                onMouseLeave={() => setTooltip(null)}
              >
                <Text
                  color={tooltip === muscle ? "inherit" : "gray.300"}
                  fontWeight={tooltip === muscle ? "bold" : "normal"}
                >
                  {muscle}
                </Text>
              </LinkOverlay>
            </LinkBox>
          ))}
        </Box>
      )}
    </>
  );
};

export default HumanBody;
