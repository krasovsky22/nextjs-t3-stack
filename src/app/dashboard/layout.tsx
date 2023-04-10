import getSession from "@utils/getSession";
import { redirect } from "next/navigation";
import { GiBiceps } from "react-icons/gi";
import { TbBarbell } from "react-icons/tb";

import { SecureSidebar, type NavLinkType } from "@/components/secureSidebar";

export const metadata = {
  title: "Dashboard",
  description: "This is main dashboard.",
};

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

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    void redirect("/");
  }

  return (
    <section className="grid h-full w-full grid-cols-10 place-items-center gap-5">
      <aside className="col-span-1 h-full w-full">
        <SecureSidebar navLinks={sidebarNavLinks} />
      </aside>
      <main className="col-span-9 h-full w-full border-r border-gray-300 p-3">
        {children}
      </main>
    </section>
  );
}
