import {
  Text,
  VStack,
  Icon,
  StackDivider,
  Box,
  Container,
  Flex,
} from "@chakra-ui/react";
import { TbBarbell } from "react-icons/tb";
import { type IconType } from "react-icons";
import Link from "next/link";

type RouteType = {
  icon: IconType;
  name: string;
};
const sidebarRoutes: RouteType[] = [
  {
    icon: TbBarbell,
    name: "Workouts",
  },
  {
    icon: TbBarbell,
    name: "Exercise",
  },
];

const SecureSidebar = () => {
  return (
    // <VStack divider={<StackDivider borderColor="gray.200" />}>
    <Flex flexDir="column">
      {sidebarRoutes.map((route) => (
        <Container
          key={route.name}
          w="100%"
          height="40px"
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          bg="yellow.100"
          className="hover:bg-yellow-300"
          marginTop={0}
        >
          <Link
            href={"/dashboard/workout"}
            className="flex items-center justify-center gap-3"
          >
            <Icon as={route.icon} />
            <Text as="span">{route.name}</Text>
          </Link>
        </Container>
      ))}
    </Flex>
  );
};

export default SecureSidebar;
