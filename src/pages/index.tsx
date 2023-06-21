import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import SignIn from "@/components/SignIn/SignIn";
import { MainController } from "@/components/MainController/MainController";

export default function Home() {
  return (
    <>
      <Head>
        <title>QuanderDome</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <MainController />
      </main>
    </>
  );
}
