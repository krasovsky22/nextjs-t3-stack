import type { ReactElement } from "react";
import Head from "next/head";
import { LogoutButton } from "@components/buttons";
import { type NavLinkType, SecureSidebar } from "@components/secureSidebar";
import { GiBiceps } from "react-icons/gi";
import { TbBarbell } from "react-icons/tb";

const sidebarNavLinks: NavLinkType[] = [
  {
    icon: <TbBarbell />,
    name: "Workouts",
    url: "/dashboard",
  },
  {
    icon: <TbBarbell />,
    name: "Exercise",
    url: "/dashboard/exercises",
  },
  {
    icon: <GiBiceps />,
    name: "Muscle Groups",
    url: "/dashboard/muscle-groups",
  },

  {
    icon: <GiBiceps />,
    name: "Todo",
    url: "/dashboard/todo",
  },

  {
    icon: <GiBiceps />,
    name: "Week Tracker",
    url: "/dashboard/workouts",
  },
];

const SecureLayout = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactElement;
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex h-screen w-full flex-col">
        <header className="grid h-14 w-full grid-cols-12 items-center justify-around border-b border-gray-200 px-5 text-2xl">
          <div className="col-span-11"></div>
          <div className="col-span-1 flex flex-row-reverse">
            <LogoutButton />
          </div>
        </header>
        <section className="grid h-full w-full grid-cols-12 place-items-center gap-5">
          <aside className="col-span-2 h-full w-full">
            <SecureSidebar navLinks={sidebarNavLinks} />
          </aside>
          <main className="col-span-10 h-full w-full border-r border-gray-300 p-3">
            {children}
          </main>
        </section>
      </div>
    </>
  );
};

export default SecureLayout;
