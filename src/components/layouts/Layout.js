import { Header } from "./Header";
import Head from "next/head";

export const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Product Hunt Clone</title>
      </Head>
      <Header />
      <main>{children}</main>
    </>
  );
};
