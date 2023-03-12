import type { ReactElement } from "react";
import Head from "next/head";
import { LogoutButton } from "./Buttons";

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
      <div className="flex h-screen w-full flex-col px-5">
        <header className="flex h-14 w-full items-center justify-around border-b border-gray-200 text-2xl">
          <LogoutButton />
        </header>
        <section className="grid h-full w-full grid-cols-12 place-items-center">
          <aside className="col-span-1 h-full w-full">Aside</aside>
          <main className="col-span-11 h-full w-full border-r border-gray-300">
            {children}
          </main>
        </section>
      </div>
    </>
  );
};

export default SecureLayout;
