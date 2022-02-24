import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";

import { useGetUserRequest } from "../hooks/requests";
import { UserContext } from "../context/user/user.context";
import { signInSuccess } from "../context/user/user.actions";

import Spinner from "../components/spinner/Spinner";
import RegisterModal from "../components/register-modal/RegisterModal";
import LoginCard from "../components/login-card/LoginCard";

import styles from "../styles/Home.module.scss";

export default function Home() {
  const [loginCheck, setLoginCheck] = useState(true);

  const { userDispatch } = useContext(UserContext);

  const router = useRouter();

  // Check if the user is already signed in
  useEffect(async () => {
    if (window.localStorage.getItem("token")) {
      useGetUserRequest()
        .then(({ data }) => {
          userDispatch(signInSuccess(data));
          router.push("/room");
        })
        .catch((err) => {
          setLoginCheck(false);
        });
    } else {
      setLoginCheck(false);
    }
  }, []);

  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const handleRegisterModalClose = () => {
    setShowRegisterModal(false);
  };

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
              src="/static/people_illustration.png"
              height={3412}
              width={5799}
              className={styles.chat_image}
            />
          </div>
          <LoginCard
            handleRegisterModalShow={() => {
              setShowRegisterModal(true);
            }}
          />
          <RegisterModal
            open={showRegisterModal}
            onClose={handleRegisterModalClose}
          />
        </main>
      )}
    </div>
  );
}
