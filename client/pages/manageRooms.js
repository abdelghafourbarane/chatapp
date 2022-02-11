import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

import { UserContext } from "../context/user/user.context";
import { RoomsContext } from "../context/rooms/rooms.context";

import Header from "../components/header/Header";
import Spinner from "../components/spinner/Spinner";
import ManageRoomPreview from "../components/manage-room-preview/ManageRoomPreview";

import { signInSuccess } from "../context/user/user.actions";
import {
  getRoomsStart,
  getRoomsSuccess,
  getRoomsFailure,
} from "../context/rooms/rooms.actions";
import { useGetUserRequest, useGetRoomsRequest } from "../hooks/requests";

import styles from "../styles/manageRooms.module.scss";

function manageRooms() {
  const {
    userState: { user },
    userDispatch,
  } = useContext(UserContext);
  const {
    roomsState: { rooms },
    roomsDispatcher,
  } = useContext(RoomsContext);

  const [loginCheck, setLoginCheck] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      useGetUserRequest()
        .then((user) => {
          userDispatch(signInSuccess(user.data));
          setLoginCheck(false);
        })
        .catch((err) => {
          router.push("/");
        });
    } else {
      setLoginCheck(false);
    }

    if (!rooms.length) {
      roomsDispatcher(getRoomsStart());
      useGetRoomsRequest()
        .then((rooms) => {
          roomsDispatcher(getRoomsSuccess(rooms.data));
        })
        .catch((err) => {
          roomsDispatcher(getRoomsFailure(err));
        });
    }
  }, []);
  console.log(
    "rooms: ",
    rooms.filter((room) => room.created_by === user?.username)
  );
  console.log("user: ", user);

  return loginCheck ? (
    <Spinner />
  ) : (
    <div className={styles.manage_rooms_page}>
      <Header />
      <div className={styles.main_container}>
        <div className={styles.rooms_container}>
          {/* <ManageRoomPreview room_name="react.js room" />
          <ManageRoomPreview room_name="react.js room" /> */}
          {rooms
            .filter((room) => room.created_by === user?.username)
            .map((room) => (
              <ManageRoomPreview
                room_name={room.room_name}
                room_id={room.room_id}
                key={room.room_id}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default manageRooms;
