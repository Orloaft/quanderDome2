import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import SignIn from "@/components/SignIn/SignIn";
import { UserContext } from "@/hooks/useUserContext";

export default function Home() {
  const [username, setUsername] = useState("");
  const verifyName = (username: string) => {};
  return (
    <UserContext.Provider value={{ username, setUsername }}>
      <Head>
        <title>QuanderDome</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <SignIn verifyName={verifyName} />
      </main>
    </UserContext.Provider>
  );
}
