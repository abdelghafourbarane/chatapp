import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import Header from "../components/header/Header";
import CustomButton from "../components/custom-button/CustomButton";

import { useRoomCreateRequest } from "../hooks/requests";

import styles from "../styles/createRoom.module.scss";

function CreateRoom() {
  const [roomNameField, setRoomNameField] = useState("");

  const handleRoomNameChange = (event) => {
    setRoomNameField(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    useRoomCreateRequest(roomNameField).then((room) => {
      console.log(room.data);
    });
  };

  return (
    <div className={styles.create_room_page}>
      <Header />
      <div className={styles.main_container}>
        <form
          method="post"
          onSubmit={handleSubmit}
          className={styles.inputs_container}
        >
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
          <CustomButton variant="green" rounded={true} type="submit">
            <AddIcon className={styles.button_icon} />
          </CustomButton>
        </form>
      </div>
    </div>
  );
}

export default CreateRoom;
