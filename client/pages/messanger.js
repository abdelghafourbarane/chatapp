import React, { useEffect, useContext, useState } from "react";

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

function Messanger() {
  //retrieving contexts states and dispatchers
  const {
    userDispatch,
    userState: { user },
  } = useContext(UserContext);
  const {
    roomsState: { rooms },
    roomsDispatcher,
  } = useContext(RoomsContext);

  //room to show in the messages section and
  const [roomClicked, setRoomClicked] = useState(null);
  //messages to pass as props to MessagesSection component
  const [messagesToShow, setMessagesToShow] = useState([]);

  //dispatch new message to context whenever a message is received
  useEffect(() => {
    socket.on("newMessage", (data) => {
      roomsDispatcher(addMessageToRoomSuccess(data.room_id, data.message));
    });
    return () => socket.disconnect();
  }, [socket]);

  const handleRoomClick = (room_id) => {
    setRoomClicked(room_id);
  };

  //executed whenenver a room is clicked on RoomsSection component
  useEffect(() => {
    if (roomClicked) {
      const roomToShow = rooms.find((room) => room.room_id === roomClicked);
      setMessagesToShow(roomToShow.messages);
    }
  }, [roomClicked, rooms]);

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

  console.log("rooms: ", rooms);
  console.log("user: ", user);
  return (
    <div className={styles.messanger_page}>
      <Header />
      <div className={styles.main_container}>
        <RoomsSectionContainer handleRoomClick={handleRoomClick} />
        <MessagesSection
          socket={socket}
          roomClicked={roomClicked}
          messages={messagesToShow}
          currentUsername={user?.username}
        />
      </div>
    </div>
  );
}

export default Messanger;
