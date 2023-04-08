import HumanBody from "@/components/humanBody";
import React from "react";

export default function Home() {
  return (
    <div className="flex h-full content-center items-center gap-10">
      <HumanBody />
      <HumanBody isBack />
    </div>
  );
}
