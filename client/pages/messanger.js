import React, { useEffect, useContext, useState, useCallback } from "react";

import { socket } from "../hooks/socket";

import { RoomsContext } from "../context/rooms/rooms.context";
import { UserContext } from "../context/user/user.context";

import {
  getRoomsFailure,
  getRoomsStart,
  getRoomsSuccess,
  addMessageToRoomSuccess,
} from "../context/rooms/rooms.actions";

import { signInSuccess } from "../context/user/user.actions";

import Header from "../components/header/Header";
import RoomsSectionContainer from "../components/rooms-section-container/RoomsSectionContainer";
import MessagesSection from "../components/messages-section/MessagesSection";

import { useGetRoomsRequest, useGetUserRequest } from "../hooks/requests";

import styles from "../styles/messanger.module.scss";

// if (socket) {
//   console.log("socket id", socket.id);
//   socket.on("connectedToRoom", (data) => {
//     console.log("data sent by room server", data);
//   });
// } else {
//   console.log("socket is null");
// }

function Messanger() {
  const {
    userDispatch,
    userState: { user },
  } = useContext(UserContext);

  const {
    roomsState: { rooms },
    roomsDispatcher,
  } = useContext(RoomsContext);

  useEffect(() => {
    socket.on("newMessage", (data) => {
      roomsDispatcher(addMessageToRoomSuccess(data.room_id, data.message));
      console.log("data sent by server socket :", data);
    });
    return () => socket.disconnect();
  }, [socket]);

  const [roomClicked, setRoomClicked] = useState(null);
  const [messagesToShow, setMessagesToShow] = useState([]);

  const handleRoomClick = (room_id) => {
    setRoomClicked(room_id);
  };

  useEffect(() => {
    if (roomClicked) {
      const roomToShow = rooms.find((room) => room.room_id === roomClicked);
      setMessagesToShow(roomToShow.messages);
    }
  }, [roomClicked, rooms]);

  // useEffect(() => {
  //   socket.emit("create", roomClicked);
  // }, [roomClicked]);

  //initialize rooms context when messanger page mounts for the first time
  useEffect(() => {
    roomsDispatcher(getRoomsStart());
    useGetRoomsRequest()
      .then((rooms) => {
        roomsDispatcher(getRoomsSuccess(rooms.data));
      })
      .catch((err) => {
        roomsDispatcher(getRoomsFailure(err));
      });
    useGetUserRequest().then((user) => {
      userDispatch(signInSuccess(user.data));
    });
  }, []);

  return (
    <div className={styles.messanger_page}>
      <Header />
      <div className={styles.main_container}>
        <RoomsSectionContainer handleRoomClick={handleRoomClick} />
        <MessagesSection
          socket={socket}
          roomClicked={roomClicked}
          messages={messagesToShow}
          currentUsername={user.username}
        />
      </div>
    </div>
  );
}

export default Messanger;
