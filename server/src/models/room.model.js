import { db } from "../services/postgres";

const createRoom = (created_by, room_name) => {
  return new Promise((resolve, reject) => {
    db.insert({
      created_at: new Date(),
      created_by: created_by,
      room_name: room_name,
    })
      .into("room")
      .then((room) => {
        resolve(room[0]);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const addUserToRoom = (user_id, room_id) => {
  return new Promise((resolve, reject) => {
    db.insert({
      user_id,
      room_id,
    })
      .into("user_room_join")
      .then((userRoomJoin) => {
        resolve(userRoomJoin[0]);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = {
  createRoom,
  addUserToRoom,
};
