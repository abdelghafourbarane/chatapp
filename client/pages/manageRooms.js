import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

import { UserContext } from "../context/user/user.context";

import Header from "../components/header/Header";
import Spinner from "../components/spinner/Spinner";

import { signInSuccess } from "../context/user/user.actions";
import { useGetUserRequest } from "../hooks/requests";

import styles from "../styles/manageRooms.module.scss";

function manageRooms() {
  const { userDispatch } = useContext(UserContext);
  const [loginCheck, setLoginCheck] = useState(true);
  const router = useRouter();
  useEffect(() => {
    useGetUserRequest()
      .then((user) => {
        userDispatch(signInSuccess(user.data));
        setLoginCheck(false);
      })
      .catch((err) => {
        router.push("/");
      });
  }, []);
  return loginCheck ? (
    <Spinner />
  ) : (
    <div className={styles.manage_rooms_page}>
      <Header />
      <div className={styles.main_container}>manageRooms</div>
    </div>
  );
}

export default manageRooms;
