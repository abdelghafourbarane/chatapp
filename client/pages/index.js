import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";

import { useGetUserRequest } from "../hooks/requests";
import { UserContext } from "../context/user/user.context";
import { signInSuccess } from "../context/user/user.actions";

import CustomButton from "../components/custom-button/CustomButton";
import Spinner from "../components/spinner/Spinner";

import styles from "../styles/Home.module.scss";

export default function Home() {
  const [loginCheck, setLoginCheck] = useState(true);

  const { dispatch } = useContext(UserContext);

  const router = useRouter();

  // Check if the user is already signed in
  useEffect(async () => {
    if (window.localStorage.getItem("token")) {
      useGetUserRequest()
        .then(({ data }) => {
          dispatch(signInSuccess(data));
          router.push("/room");
        })
        .catch((err) => {
          setLoginCheck(false);
        });
    } else {
      setLoginCheck(false);
    }
  }, []);

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

      {loginCheck ? (
        <Spinner />
      ) : (
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
      )}
    </div>
  );
}
