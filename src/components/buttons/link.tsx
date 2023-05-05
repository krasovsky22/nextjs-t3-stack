import { type ReactNode } from "react";
import { IconButton, type IconButtonProps } from "@chakra-ui/react";
import Link from "next/link";

interface LinkButtonProps extends IconButtonProps {
  children: ReactNode;
  href: string;
}
const LinkButton: React.FC<LinkButtonProps> = ({
  href,
  children,
  ...buttonProps
}) => {
  return (
    <Link href={href}>
      <IconButton {...buttonProps}>{children}</IconButton>
    </Link>
  );
};

export default LinkButton;
