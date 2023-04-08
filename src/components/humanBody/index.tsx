"use client";

import { capitalize } from "lodash";
import {
  Box,
  Tooltip,
  Text,
  LinkOverlay,
  LinkBox,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

import BackBody from "./back";
import FrontBody from "./front";
import styles from "./humanbody.module.css";
import withChakra from "@utils/withChakra";
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
        <Flex
          paddingY="20px"
          height="100%"
          flexDir="column"
          flex="1"
          justifyItems="baseline"
          alignItems="flex-end"
          justifyContent="space-evenly"
        >
          {allMuscleGroups.map((muscle) => (
            <LinkBox key={muscle}>
              <LinkOverlay
                href="#"
                onMouseEnter={() => handleTextMouseEnter(muscle)}
                onMouseLeave={() => setTooltip(null)}
              >
                <Text
                  fontSize="large"
                  color={tooltip === muscle ? "inherit" : "blackAlpha.500"}
                  fontWeight={tooltip === muscle ? "bold" : "normal"}
                >
                  {capitalize(muscle)}
                </Text>
              </LinkOverlay>
            </LinkBox>
          ))}
        </Flex>
      )}
      <Tooltip isOpen label={capitalize(tooltip ?? "")} placement="top">
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
        <Flex
          paddingY="20px"
          height="100%"
          flexDir="column"
          flex="1"
          justifyItems="baseline"
          alignItems="flex-start"
          justifyContent="space-evenly"
        >
          {allMuscleGroups.map((muscle) => (
            <LinkBox key={muscle}>
              <LinkOverlay
                href="#"
                onMouseEnter={() => handleTextMouseEnter(muscle)}
                onMouseLeave={() => setTooltip(null)}
              >
                <Text
                  fontSize="large"
                  color={tooltip === muscle ? "inherit" : "blackAlpha.500"}
                  fontWeight={tooltip === muscle ? "bold" : "normal"}
                >
                  {capitalize(muscle)}
                </Text>
              </LinkOverlay>
            </LinkBox>
          ))}
        </Flex>
      )}
    </>
  );
};

export default withChakra(HumanBody);
