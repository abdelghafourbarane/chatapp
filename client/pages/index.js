import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import CustomButton from "../components/custom-button/CustomButton";

import styles from "../styles/Home.module.scss";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Next Chat</title>
        <meta
          name="description"
          content="App created using Next.js and Node.js"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <div className={styles.image_wrapper}>
          <Image
            src="/static/chat.png"
            height={512}
            width={512}
            className={styles.chat_image}
          />
        </div>
        <h1 className={styles.app_name}>Next.js Chat App</h1>
        <div className={styles.buttons_container}>
          <Link href="/login">
            <a>
              <CustomButton variant="blue">Login</CustomButton>
            </a>
          </Link>
          <div className={styles.or_container}>
            <div className={styles.or_line}></div>
            <span className={styles.or_text}>OR</span>
            <div className={styles.or_line}></div>
          </div>
          <Link href="/register">
            <a>
              <CustomButton variant="red">Register</CustomButton>
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
}
