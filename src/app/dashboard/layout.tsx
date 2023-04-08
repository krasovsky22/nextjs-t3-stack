import getSession from "@utils/getSession";
import { redirect } from "next/navigation";
import { SecureSidebar } from "@/components/secureSidebar";

export const metadata = {
  title: "Dashboard",
  description: "This is main dashboard.",
};

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
    <section className="grid h-full w-full grid-cols-12 place-items-center gap-5">
      <aside className="col-span-2 h-full w-full">
        <SecureSidebar />
      </aside>
      <main className="col-span-10 h-full w-full border-r border-gray-300 p-3">
        {children}
      </main>
    </section>
  );
}
