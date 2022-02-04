import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import GroupIcon from "@material-ui/icons/Group";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import { UserContext } from "../context/user/user.context";
import { useGetUserRequest } from "../hooks/requests";
import { signInSuccess } from "../context/user/user.actions";

import Header from "../components/header/Header";
import CustomButton from "../components/custom-button/CustomButton";
import Spinner from "../components/spinner/Spinner";

import styles from "../styles/room.module.scss";

function Room() {
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

  return (
    <div className={styles.room_page}>
      {loginCheck ? (
        <Spinner />
      ) : (
        <>
          <Header />
          <div className={styles.main_container}>
            <Link href="/messanger">
              <a>
                <CustomButton variant="blue">
                  <div className={styles.button_content}>
                    <span>Join Room</span>
                    <GroupIcon className={styles.button_icon} />
                  </div>
                </CustomButton>
              </a>
            </Link>

            <Link href="/createRoom">
              <a>
                <CustomButton variant="green">
                  <div className={styles.button_content}>
                    <span>Create Room</span>
                    <AddCircleOutlineIcon className={styles.button_icon} />
                  </div>
                </CustomButton>
              </a>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Room;
