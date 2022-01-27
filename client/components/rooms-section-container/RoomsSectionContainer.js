import React, { useContext } from "react";

import { RoomsContext } from "../../context/rooms/rooms.context";

import RoomPreview from "../room-preview/RoomPreview";

import styles from "./RoomsSectionContainer.module.scss";

function RoomsSectionContainer({ handleRoomClick }) {
  const { rooms } = useContext(RoomsContext).roomsState;

  // const handlePreviewClick = (room_id) => {

  // };

  return (
    <div className={styles.rooms_container}>
      {rooms.map((room) => (
        <RoomPreview
          room_name={room.room_name}
          room_id={room.room_id}
          last_message={
            room.messages.length !== 0
              ? room.messages[room.messages.length - 1].content
              : "no message"
          }
          key={`roompreview_${room.room_id}`}
          handleRoomClick={handleRoomClick}
        />
      ))}
    </div>
  );
}

export default RoomsSectionContainer;
