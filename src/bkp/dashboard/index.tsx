import { useCallback, useState } from "react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { Text, Flex, Grid, GridItem, Box, IconButton } from "@chakra-ui/react";

type WeekDayType = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
const DAYS: WeekDayType[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// ✅ Get the first day of the current week (Monday)
function getFirstDayOfWeek(date: Date = new Date()): Date {
  // 👇️ clone date object, so we don't mutate it
  const dateCopy = new Date(date);
  const day = dateCopy.getDay(); // 👉️ get day of week

  // 👇️ day of month - day of week (-6 if Sunday), otherwise +1
  const diff = dateCopy.getDate() - day + (day === 0 ? -6 : 1);

  return new Date(dateCopy.setDate(diff));
}

function getWeekDate(mondayDate: Date, dayString: WeekDayType) {
  const key = DAYS.indexOf(dayString);
  const tDate = new Date(mondayDate);
  tDate.setDate(tDate.getDate() + key + 1);

  return tDate.getDate();
}

const Dashboard = () => {
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
    <Flex height="100%" flexDir="column" gap={3}>
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
            {mondayDate.toLocaleString("default", { month: "long" })}
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
          >
            <Text fontSize="xx-large" color="gray.500">
              {day}
            </Text>
            <Text fontWeight="bold">{getWeekDate(mondayDate, day)}</Text>
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
        <GridItem w="100%" bg="blue.500" />
        <GridItem w="100%" bg="blue.500" />
        <GridItem w="100%" bg="blue.500" />
        <GridItem w="100%" bg="blue.500" />
        <GridItem w="100%" bg="blue.500" />
        <GridItem w="100%" bg="blue.500" />
        <GridItem w="100%" bg="blue.500" />
      </Grid>
    </Flex>
  );
};

Dashboard.requireAuth = true;
Dashboard.title = "Dashboard";
Dashboard.description = "Dashboard Page Description";

export default Dashboard;
