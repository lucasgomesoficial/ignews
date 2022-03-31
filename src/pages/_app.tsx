import { SessionProvider as NextAuthProvider } from "next-auth/react";
import NextNProgress from "nextjs-progressbar";
import { AppProps } from "next/app";
import { Header } from "../components/header";

import "../styles/global.scss";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <NextAuthProvider session={session}>
      <NextNProgress
        color="#FFF"
        height={1}
        options={{ showSpiner: false }}
      />
      <Header />
      <Component {...pageProps} />
    </NextAuthProvider>
  );
}
