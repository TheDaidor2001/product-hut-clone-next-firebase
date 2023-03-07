import { Header } from "./Header";
import Head from "next/head";

export const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <html lang="es" />
        <title>Product Hunt Clone</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
      </Head>
      <Header />
      <main>{children}</main>
    </>
  );
};
