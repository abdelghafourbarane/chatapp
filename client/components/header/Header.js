import React from "react";
import Image from "next/image";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import styles from "./Header.module.scss";

function Header({ username, email }) {
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
          <span className={styles.username}>{username}</span>
          <span className={styles.email}>{email}</span>
        </div>
        <ExitToAppIcon className={styles.logout_icon} />
      </div>
    </header>
  );
}

export default Header;
