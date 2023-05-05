import type { ReactElement } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Loading } from "@components/loading";

const SecureWrapper = ({ children }: { children: ReactElement | null }) => {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated: () => {
      void router.push("/");
    },
  });

  if (status === "loading") {
    return <Loading status="Loading Session" />;
  }

  return <>{children}</>;
};

export default SecureWrapper;
