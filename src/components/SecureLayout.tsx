import type { ReactElement } from "react";
import Head from "next/head";
import { LogoutButton } from "./Buttons";

const SecureLayout = ({ children }: { children: ReactElement }) => {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-screen w-full flex-col ">
        <header className="flex h-14 w-full items-center justify-around border-b border-gray-200 text-2xl">
          <LogoutButton />
        </header>
        <section className="grid h-full w-full grid-cols-12 place-items-center">
          <main className="col-span-8 h-full w-full border-r border-gray-300">
            {children}
          </main>
          <aside className="col-span-4 h-full w-full">Aside</aside>
        </section>
      </div>
    </>
  );
};

export default SecureLayout;
