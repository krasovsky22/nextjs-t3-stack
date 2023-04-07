import { GithubButton, LinkButton, LogoutButton } from "@components/buttons";
import getSession from "@utils/getSession";
import { AiFillHome } from "react-icons/ai";

async function Navbar() {
  const session = await getSession();

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
        {session && <LogoutButton session={session} />}

        {!session && <GithubButton />}
      </div>
    </header>
  );
}

export default Navbar;
