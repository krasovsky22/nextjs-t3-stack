import React from "react";
import { Nunito } from "next/font/google";

import "./globals.css";
import { Navbar } from "@/components/navbar";

export const metadata = {
  title: "Gym Tracker   ",
  description: "Gym App",
};

const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        {/* @ts-expect-error Server Component */}
        <Navbar />
        <main className="px-5 pt-14">{children}</main>
      </body>
    </html>
  );
}
