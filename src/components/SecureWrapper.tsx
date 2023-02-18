import type { ReactElement } from "react";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const SecureWrapper = ({ children }: { children: ReactElement | null }) => {
  const { data: sessionData, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!sessionData && status !== "loading") {
      void router.push("/");
    }
  }, [router, sessionData, status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default SecureWrapper;
