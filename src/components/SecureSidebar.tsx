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
import { GiBiceps } from "react-icons/gi";
import { type IconType } from "react-icons";
import Link from "next/link";

type RouteType = {
  icon: IconType;
  name: string;
  url: string;
};
const sidebarRoutes: RouteType[] = [
  {
    icon: TbBarbell,
    name: "Workouts",
    url: "/dashboard",
  },
  {
    icon: TbBarbell,
    name: "Exercise",
    url: "/dashboard",
  },
  {
    icon: GiBiceps,
    name: "Muscle Groups",
    url: "/dashboard/exercise/muscle-groups",
  },
];

const SecureSidebar = () => {
  return (
    <Flex flexDir="column">
      {sidebarRoutes.map((route) => (
        <Link href={route.url} key={route.url}>
          <Container
            gap={3}
            marginTop={0}
            height="40px"
            display="flex"
            bg="yellow.100"
            alignItems="center"
            justifyContent="start"
            className="hover:bg-yellow-300"
          >
            <Icon as={route.icon} />
            <Text as="span">{route.name}</Text>
          </Container>
        </Link>
      ))}
    </Flex>
  );
};

export default SecureSidebar;
