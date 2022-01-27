import React, { useContext } from "react";
import Image from "next/image";
import router from "next/router";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { useUserLogout } from "../../hooks/requests";
import { UserContext } from "../../context/user/user.context";
import { signOutSuccess } from "../../context/user/user.actions";

import styles from "./Header.module.scss";

function Header() {
  const {
    userState: { user },
    userDispatch,
  } = useContext(UserContext);

  const handleLogoutClick = () => {
    useUserLogout().then(() => {
      window.localStorage.removeItem("token");
      userDispatch(signOutSuccess);
      router.push("/");
    });
  };

  return (
    <header className={styles.header}>
      <div className={styles.image_wrapper}>
        <Image
          src="/static/chat.png"
          height={512}
          width={512}
          className={styles.chat_image}
        />
      </div>
      <div className={styles.profile_container}>
        <div className={styles.avatar_container}>
          <div className={styles.avatar_wrapper}>
            <Image
              src="/static/user.png"
              height={512}
              width={512}
              className={styles.avatar_image}
            />
          </div>
          <span className={styles.username}>{user.username}</span>
          <span className={styles.email}>{user.email}</span>
        </div>
        <ExitToAppIcon
          className={styles.logout_icon}
          onClick={handleLogoutClick}
        />
      </div>
    </header>
  );
}

export default Header;
