import Head from "next/head";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import Overlay from "../Overlay/Overlay";

import styles from "./Layout.module.css";

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Growr</title>
        <meta name="description" content="Growr" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <main className={styles.content}>
        <Header />
        <div className={styles.children}>{children}</div>
      </main>
      <Overlay />
    </div>
  );
}
