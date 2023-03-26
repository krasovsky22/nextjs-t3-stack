import {
  Box,
  type BoxProps,
  CloseButton,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { type IconType } from "react-icons";
import { GiBiceps } from "react-icons/gi";
import { TbBarbell } from "react-icons/tb";
import NavItem from "./nav-item";
import Link from "next/link";

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

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
    url: "/dashboard/exercise",
  },
  {
    icon: GiBiceps,
    name: "Muscle Groups",
    url: "/dashboard/exercise/muscle-groups",
  },
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "100%" }}
      position="absolute"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {sidebarRoutes.map((link) => (
        <Link href={link.url} key={link.url}>
          <NavItem icon={link.icon}>{link.name}</NavItem>
        </Link>
      ))}
    </Box>
  );
};

export default SidebarContent;
