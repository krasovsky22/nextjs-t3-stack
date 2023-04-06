"use client";

import { api } from "@utils/api";

const Test = () => {
  const { data } = api.example.hello.useQuery({ text: "Vlad" });

  console.log(data);
  return <div>Test</div>;
};

export default api.withTRPC(Test);
