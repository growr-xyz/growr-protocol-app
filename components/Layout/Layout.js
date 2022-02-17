import { useState } from "react";
import Head from "next/head";
import Navbar from "../Navbar/Navbar";

import styles from "./Layout.module.css";

export default function Layout({ children }) {
  let [daw] = useState();

  return (
    <div className={styles.container}>
      <Head>
        <title>Growr</title>
        <meta name="description" content="Growr" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <main className={styles.content}>{children}</main>
    </div>
  );
}
