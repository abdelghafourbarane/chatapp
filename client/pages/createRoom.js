import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import Header from "../components/header/Header";

import styles from "../styles/createRoom.module.scss";
import CustomButton from "../components/custom-button/CustomButton";

function CreateRoom() {
  const [roomNameField, setRoomNameField] = useState("");

  const handleRoomNameChange = (event) => {
    setRoomNameField(event.target.value);
  };

  return (
    <div className={styles.create_room_page}>
      <Header />
      <div className={styles.main_container}>
        <div className={styles.inputs_container}>
          <TextField
            name="room_name"
            variant="outlined"
            label="Room Name"
            value={roomNameField}
            onChange={(event) => {
              handleRoomNameChange(event);
            }}
            className={styles.text_field}
          />
          <CustomButton variant="green" rounded={true}>
            <AddIcon className={styles.button_icon} />
          </CustomButton>
        </div>
      </div>
    </div>
  );
}

export default CreateRoom;
