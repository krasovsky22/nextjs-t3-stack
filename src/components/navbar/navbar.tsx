import Link from "next/link";
import { GithubButton, LogoutButton } from "@components/buttons";
import getSession from "@utils/getSession";

async function Navbar() {
  const session = await getSession();

  return (
    <header className="absolute flex h-14 w-full items-center justify-around border-b border-gray-200 p-2 text-2xl">
      <div className="flex-grow-1 mx-5 w-full">
        {session && (
          <Link href="/dashboard">
            {/* <IconButton
              size="sm"
              icon={<AiFillHome />}
              aria-label="Dasboard"
              colorScheme="teal"
            >
              Dashboard
            </IconButton> */}
            Link
          </Link>
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
