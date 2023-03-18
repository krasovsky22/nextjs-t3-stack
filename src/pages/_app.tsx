import type { NextPage } from "next";
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";

import "../styles/globals.css";
import { api } from "../utils/api";
import Layout from "@/components/layout";
import SecureLayout from "@/components/secureLayout";
import SecureWrapper from "@/components/secureWrapper";

export type NextApplicationPage<P = unknown, IP = P> = NextPage<P, IP> & {
  requireAuth?: boolean;
  title?: string;
  description?: string;
};

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        {(Component as NextApplicationPage)?.requireAuth ? (
          <SecureWrapper>
            <SecureLayout
              title={(Component as NextApplicationPage).title ?? ""}
              description={(Component as NextApplicationPage).description ?? ""}
            >
              <Component {...pageProps} />
            </SecureLayout>
          </SecureWrapper>
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </ChakraProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
