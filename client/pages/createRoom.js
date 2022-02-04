import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { UserContext } from "../context/user/user.context";

import Header from "../components/header/Header";
import CustomButton from "../components/custom-button/CustomButton";
import Spinner from "../components/spinner/Spinner";

import { useRoomCreateRequest, useGetUserRequest } from "../hooks/requests";
import { signInSuccess } from "../context/user/user.actions";

import styles from "../styles/createRoom.module.scss";

function CreateRoom() {
  const { userDispatch } = useContext(UserContext);
  //Check user login
  const router = useRouter();
  const [loginCheck, setLoginCheck] = useState(true);
  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      useGetUserRequest().then((user) => {
        userDispatch(signInSuccess(user.data));
        setLoginCheck(false);
      });
    } else {
      router.push("/");
    }
  }, []);
  //controlled input for room creation form
  const [roomNameField, setRoomNameField] = useState("");
  const handleRoomNameChange = (event) => {
    setRoomNameField(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    useRoomCreateRequest(roomNameField).then((room) => {});
  };

  return loginCheck ? (
    <Spinner />
  ) : (
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
