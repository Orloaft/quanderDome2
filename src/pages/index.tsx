import Head from "next/head";
import styles from "@/styles/Home.module.scss";

import { MainController } from "@/components/MainController/MainController";

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <Head>
        <title>QuanderDome II</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="frame">
        <h1 className={styles.title}>QuanderDome II</h1>
      </div>
      <MainController />
    </div>
  );
}
