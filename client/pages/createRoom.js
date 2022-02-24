import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
// import Alert from "@material-ui/lab/Alert";
// import CloseIcon from "@material-ui/icons/Close";

import { UserContext } from "../context/user/user.context";
import { RoomsContext } from "../context/rooms/rooms.context";

import Header from "../components/header/Header";
import CustomButton from "../components/custom-button/CustomButton";
import Spinner from "../components/spinner/Spinner";

import { useRoomCreateRequest, useGetUserRequest } from "../hooks/requests";
import { signInSuccess } from "../context/user/user.actions";
import { addNewRoom } from "../context/rooms/rooms.actions";

import styles from "../styles/createRoom.module.scss";
import MessageModal from "../components/message-modal/MessageModal";
// import CustomModal from "../components/custom-modal/CustomModal";

function CreateRoom() {
  const {
    userDispatch,
    userState: { user },
  } = useContext(UserContext);
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
  const { roomsDispatcher } = useContext(RoomsContext);
  const handleSubmit = (event) => {
    event.preventDefault();
    useRoomCreateRequest(roomNameField)
      .then((room) => {
        roomsDispatcher(addNewRoom(room.data, user?.username));
        setRoomNameField("");
        setModalType("success");
        setModalMessage(`Room '${room.data.room_name}' created successfully`);
        setOpenedModal(true);
      })
      .catch((err) => {
        setModalType("error");
        setModalMessage(err.response.data.errMessage);
        setOpenedModal(true);
      });
  };

  const handleCloseModal = () => {
    setOpenedModal(false);
  };

  const [openedModal, setOpenedModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("");

  return loginCheck ? (
    <Spinner />
  ) : (
    <div className={styles.create_room_page}>
      {/* <CustomModal
        type={modalType}
        open={openedModal}
        handleCloseModal={handleCloseModal}
        message={modalMessage}
      /> */}
      <MessageModal
        title="Success"
        type={modalType}
        open={openedModal}
        onClose={handleCloseModal}
        content={modalMessage}
      />

      <Header />
      {/* <Alert>this is an alert</Alert> */}
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
