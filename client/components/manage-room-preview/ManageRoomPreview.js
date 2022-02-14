import React, { useContext, useState } from "react";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import { TextField } from "@material-ui/core";

import CustomButton from "../custom-button/CustomButton";
import ModalWithFormWrapper from "../modal-with-form-wrapper/ModalWithFormWrapper";

import { RoomsContext } from "../../context/rooms/rooms.context";
import { deleteRoom, updateRoom } from "../../context/rooms/rooms.actions";

import {
  useDeleteRoomRequest,
  useUpdateRoomRequest,
} from "../../hooks/requests";

import styles from "./ManageRoomPreview.module.scss";

function ManageRoomPreview({ room_name, room_id }) {
  const { roomsDispatcher } = useContext(RoomsContext);

  const handleDeleteRoomClick = () => {
    useDeleteRoomRequest(room_id)
      .then((room) => {
        console.log(room);
        roomsDispatcher(deleteRoom(room.id));
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  const [openModal, setOpeneModal] = useState(false);
  const handleCloseModal = () => {
    setOpeneModal(false);
  };

  const [roomNameField, setRoomNameField] = useState(room_name);
  const handleRoomNameFieldChange = (event) => {
    setRoomNameField(event.target.value);
  };

  const handleSave = () => {
    useUpdateRoomRequest(room_id, roomNameField)
      .then((room) => {
        console.log(room);
        roomsDispatcher(updateRoom(room.id, room.room_name));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.room_preview}>
      <div className={styles.room_name_container}>
        <span>{room_name}</span>
      </div>
      <div className={styles.buttons_container}>
        <CustomButton
          rounded
          blured
          variant="blue"
          handleClick={() => {
            setOpeneModal(true);
          }}
        >
          <EditIcon className={styles.icon} />
        </CustomButton>
        <CustomButton
          rounded
          blured
          variant="danger"
          handleClick={() => {
            handleDeleteRoomClick();
          }}
        >
          <DeleteForeverIcon className={styles.icon} />
        </CustomButton>
      </div>
      <ModalWithFormWrapper
        open={openModal}
        onClose={handleCloseModal}
        room_name={room_name}
        title="Edit Room"
        onSave={() => {
          handleSave();
        }}
      >
        <TextField
          name="roomName"
          variant="outlined"
          label="Room Name"
          value={roomNameField}
          onChange={handleRoomNameFieldChange}
        />
      </ModalWithFormWrapper>
    </div>
  );
}

export default ManageRoomPreview;
