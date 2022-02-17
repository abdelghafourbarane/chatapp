import React, { useContext, useState } from "react";
import Image from "next/image";
import router from "next/router";
import Link from "next/link";

import { useUserLogout } from "../../hooks/requests";
import { UserContext } from "../../context/user/user.context";
import { signOutSuccess } from "../../context/user/user.actions";

import ChangePasswordModal from "../change-password-modal/ChangePasswordModal";

import styles from "./Header.module.scss";

function Header() {
  const {
    userState: { user },
    userDispatch,
  } = useContext(UserContext);

  const handleLogoutClick = () => {
    useUserLogout().then(() => {
      window.localStorage.removeItem("token");
      userDispatch(signOutSuccess());
      router.push("/");
    });
  };

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showChangePasswordModal, setShowPasswordModal] = useState(false);

  return (
    <header className={styles.header}>
      <Link href="/">
        <a>
          <div className={styles.image_wrapper}>
            <Image
              src="/static/chat.png"
              height={512}
              width={512}
              className={styles.chat_image}
            />
          </div>
        </a>
      </Link>

      <div className={styles.profile_container}>
        <div
          className={styles.avatar_container}
          onClick={() => {
            setShowProfileMenu(!showProfileMenu);
          }}
        >
          <div className={styles.avatar_wrapper}>
            <Image
              src="/static/user.png"
              height={512}
              width={512}
              className={styles.avatar_image}
            />
          </div>
          <span className={styles.username}>{user?.username}</span>
          {showProfileMenu ? (
            <div className={styles.dropdown_menu_container}>
              <div className={styles.profile_menu_container}>
                <div className={styles.avatar_wrapper}>
                  <Image
                    src="/static/user.png"
                    height={512}
                    width={512}
                    className={styles.avatar_image}
                  />
                </div>

                <div className={styles.infos_container}>
                  <span>{user?.username}</span>
                  <span>{user?.email}</span>
                </div>
              </div>
              <div className={styles.dropdown_section_container}>
                <h4>Account</h4>
                <div
                  className={styles.item_container}
                  onClick={() => {
                    setShowPasswordModal(true);
                  }}
                >
                  <span>Edit Password</span>
                </div>
                <div className={styles.item_container}>
                  <span>Edit Profile</span>
                </div>
              </div>
              <div
                className={styles.dropdown_section_container}
                onClick={handleLogoutClick}
              >
                <div className={styles.item_container}>
                  <span>Logout</span>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <ChangePasswordModal
        open={showChangePasswordModal}
        onClose={() => {
          setShowPasswordModal(false);
        }}
      />
    </header>
  );
}

export default Header;
