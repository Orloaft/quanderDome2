import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import Image from "next/image";
import { MainController } from "@/components/MainController/MainController";

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <Head>
        <title>QuanderDome II</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="title">
        <Image height={50} width={300} src="/logo.png" alt="logo" />
      </div>
      <MainController />
    </div>
  );
}
