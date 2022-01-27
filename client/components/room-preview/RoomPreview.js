import React from "react";

import ImageIcon from "@material-ui/icons/Image";

import styles from "./RoomPreview.module.scss";

function RoomPreview({ room_name, last_message, room_id, handleRoomClick }) {
  return (
    <div
      className={styles.room_preview}
      onClick={() => {
        handleRoomClick(room_id);
      }}
    >
      <div className={styles.icon_container}>
        <ImageIcon className={styles.image_icon} />
      </div>
      <div className={styles.room_info}>
        <span className={styles.room_name}>{room_name}</span>
        <span className={styles.last_message}>{last_message}</span>
      </div>
    </div>
  );
}

export default RoomPreview;
