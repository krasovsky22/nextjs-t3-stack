import type { ReactElement } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const SecureWrapper = ({ children }: { children: ReactElement | null }) => {
  const router = useRouter();
  useSession({
    required: true,
    onUnauthenticated: () => {
      void router.push("/");
    },
  });

  return <>{children}</>;
};

export default SecureWrapper;
