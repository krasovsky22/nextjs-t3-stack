import HumanBody from "@/components/human-body";
import React from "react";

export const metadata = {
  title: "Create Mext App",
  description: "Test Description",
};

export default function Home() {
  return (
    <div className="flex h-full content-center items-center gap-10">
      <HumanBody />
      <HumanBody isBack />
    </div>
  );
}
