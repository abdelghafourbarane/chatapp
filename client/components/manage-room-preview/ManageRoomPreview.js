import React, { useContext } from "react";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";

import CustomButton from "../custom-button/CustomButton";

import { RoomsContext } from "../../context/rooms/rooms.context";
import { deleteRoom } from "../../context/rooms/rooms.actions";

import { useDeleteRoomRequest } from "../../hooks/requests";

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

  return (
    <div className={styles.room_preview}>
      <div className={styles.room_name_container}>
        <span>{room_name}</span>
      </div>
      <div className={styles.buttons_container}>
        <CustomButton rounded blured variant="blue">
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
    </div>
  );
}

export default ManageRoomPreview;
