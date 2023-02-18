import { type AppType } from "next/app";
import { type Session } from "next-auth";
import type { NextPage } from "next";
import { SessionProvider } from "next-auth/react";

import { ChakraProvider } from "@chakra-ui/react";
import { api } from "../utils/api";

import "../styles/globals.css";
import Layout from "@components/layout";
import SecureWrapper from '@components/SecureWrapper';

export type NextApplicationPage<P = any, IP = P> = NextPage<P, IP> & {
  requireAuth?: boolean;
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
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SecureWrapper>
        ) : (
          <Component {...pageProps} />
        )}
      </ChakraProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
