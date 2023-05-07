import {
  Box,
  Text,
  Flex,
  Grid,
  Modal,
  Button,
  GridItem,
  ModalBody,
  IconButton,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  ModalCloseButton,
} from "@chakra-ui/react";
import { WorkoutForm } from "@components/forms/workout";
import { useCallback, useState } from "react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";

import { DAYS, getFirstDayOfWeek, getWeekDate } from "./utils";

const CalendarWeek = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mondayDate, setMondayDate] = useState(getFirstDayOfWeek());

  const onPrevWeekClicked = useCallback(() => {
    const copy = new Date(mondayDate.toISOString());

    const weekAgoDate = new Date(copy.setDate(copy.getDate() - 7));
    setMondayDate(weekAgoDate);
  }, [mondayDate]);

  const onNextWeekClicked = useCallback(() => {
    const copy = new Date(mondayDate.toISOString());

    const weekAgoDate = new Date(copy.setDate(copy.getDate() + 7));
    setMondayDate(weekAgoDate);
  }, [mondayDate]);

  return (
    <>
      <Flex gap={3} w="100%" textAlign="center">
        <Box>
          <IconButton
            icon={<AiOutlineDoubleLeft size="25px" />}
            aria-label="Prev Week"
            variant="outline"
            onClick={onPrevWeekClicked}
          />
        </Box>
        <Box flexGrow={1}>
          <Text fontSize="2xl">
            {mondayDate.toLocaleString("default", { month: "long" })}{" "}
            {mondayDate.toLocaleString("default", { year: "numeric" })}
          </Text>
        </Box>
        <Box>
          <IconButton
            icon={<AiOutlineDoubleRight size="25px" />}
            aria-label="Next Week"
            variant="outline"
            onClick={onNextWeekClicked}
          />
        </Box>
      </Flex>
      <Grid templateColumns="repeat(7, 1fr)" gap={2} flex={1}>
        {DAYS.map((day) => (
          <GridItem
            key={day}
            w="100%"
            bg="pink"
            as={Flex}
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            py={3}
          >
            <Text fontSize="xx-large" color="gray.500">
              {day}
            </Text>
            <Text fontWeight="bold">{getWeekDate(mondayDate, day)}</Text>
            <Button colorScheme="blue" size="sm" mt={3} onClick={onOpen}>
              Track Workout
            </Button>
          </GridItem>
        ))}
      </Grid>

      <Grid
        templateColumns="repeat(7, 1fr)"
        gap={2}
        height="100%"
        flexGrow="1"
        flex={4}
      >
        <GridItem w="100%" bg="green.200">
          Empty
        </GridItem>
        <GridItem w="100%" bg="blue.500">
          Empty
        </GridItem>
        <GridItem w="100%" bg="blue.500">
          Empty
        </GridItem>
        <GridItem w="100%" bg="blue.500">
          Empty
        </GridItem>
        <GridItem w="100%" bg="blue.500">
          Empty
        </GridItem>
        <GridItem w="100%" bg="blue.500">
          Empty
        </GridItem>
        <GridItem w="100%" bg="blue.500">
          Empty
        </GridItem>
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader>Track Workout</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <WorkoutForm date={new Date().toISOString()} />
          </ModalBody>

          {/* <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="green">Save</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CalendarWeek;
