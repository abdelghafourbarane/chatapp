import React, { useContext } from "react";

import GroupIcon from "@material-ui/icons/Group";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import { UserContext, useEffect } from "../context/user/user.context";

import Header from "../components/header/Header";
import CustomButton from "../components/custom-button/CustomButton";

import styles from "../styles/room.module.scss";

function Room() {
  const { state } = useContext(UserContext);

  console.log(state);
  return (
    <div className={styles.room_page}>
      <Header username={state.user.username} email={state.user.email} />
      <div className={styles.main_container}>
        <CustomButton variant="blue">
          <div className={styles.button_content}>
            <span>Join Room</span>
            <GroupIcon className={styles.button_icon} />
          </div>
        </CustomButton>
        <CustomButton variant="green">
          <div className={styles.button_content}>
            <span>Create Room</span>
            <AddCircleOutlineIcon className={styles.button_icon} />
          </div>
        </CustomButton>
      </div>
    </div>
  );
}

export default Room;
