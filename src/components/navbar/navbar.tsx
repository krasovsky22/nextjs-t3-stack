import { GithubButton, LinkButton, LogoutButton } from "@components/buttons";
import { useSession } from "next-auth/react";
import { AiFillHome } from "react-icons/ai";

function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="absolute flex h-14 w-full items-center justify-around border-b border-gray-200 p-2 text-2xl">
      <div className="flex-grow-1 mx-5 w-full">
        {session && (
          <LinkButton
            href="/dashboard"
            aria-label="Dashboard"
            icon={<AiFillHome />}
          >
            Dashboard
          </LinkButton>
        )}
      </div>
      <div className="mx-5">
        {session?.user && <LogoutButton />}

        {!session?.user && <GithubButton />}
      </div>
    </header>
  );
}

export default Navbar;
