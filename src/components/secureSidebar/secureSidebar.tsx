import Link from "next/link";
import { GiBiceps } from "react-icons/gi";
import { TbBarbell } from "react-icons/tb";

type RouteType = {
  icon: React.ReactElement;
  name: string;
  url: string;
};
const sidebarRoutes: RouteType[] = [
  {
    icon: <TbBarbell />,
    name: "Workouts",
    url: "/dashboard",
  },
  {
    icon: <TbBarbell />,
    name: "Exercise",
    url: "/dashboard/exercise",
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
];

const SecureSidebar = () => {
  return (
    <div className="relative min-h-full border-r-2 border-gray-100 bg-gray-100">
      <div className="border-r-1 w-100 absolute block h-full w-full border-gray-100 bg-white">
        {/* <div className="mx-8 flex h-20 w-full items-center justify-between ">
          <p className="font-[monospace] text-2xl font-bold">Logo</p>
        </div> */}
        {sidebarRoutes.map((link) => (
          <Link href={link.url} key={link.url}>
            <div className="flex cursor-pointer items-center gap-4 p-4 hover:bg-cyan-400 hover:text-white">
              {link.icon}
              {link.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SecureSidebar;
