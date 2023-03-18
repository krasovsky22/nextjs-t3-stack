import {
  Image,
  Button,
  Popover,
  IconButton,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";

const LogoutButton = () => {
  const { data: sessionData } = useSession();

  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>
        <IconButton
          aria-label="Profile"
          icon={
            <Image
              width={10}
              src={sessionData?.user?.image ?? ""}
              alt={sessionData?.user?.name ?? ""}
              fallbackSrc="https://via.placeholder.com/150"
            />
          }
        ></IconButton>
      </PopoverTrigger>
      <PopoverContent width="100px">
        <Button
          size="sm"
          onClick={() => void signOut({ callbackUrl: "/", redirect: true })}
        >
          Logout
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default LogoutButton;
