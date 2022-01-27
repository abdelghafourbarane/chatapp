const { db } = require("../services/postgres");

const createRoom = (created_by, room_name) => {
  return new Promise((resolve, reject) => {
    db.insert({
      created_at: new Date(),
      created_by: created_by,
      room_name: room_name,
    })
      .into("room")
      .returning("*")
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

const getRoomsWithMessages = () => {
  return new Promise((resolve, reject) => {
    db.select("*")
      .from("room")
      .then((rooms) => {
        const roomsToReturn = Promise.all(
          rooms.map((room) => {
            return db
              .raw(
                `SELECT m.id AS "message_id", sent_on,content,username AS "sender_name"
                  FROM message AS m 
                  INNER JOIN users AS u ON u.id=m.sender_id WHERE m.room_id=?
                  ORDER BY sent_on`,
                [room.id]
              )
              .then((messages) => {
                return {
                  room_id: room.id,
                  room_name: room.room_name,
                  created_at: room.created_at,
                  created_by: room.created_by,
                  messages: messages.rows,
                };
              });
          })
        );
        resolve(roomsToReturn);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getRoomsId = () => {
  return new Promise((resolve, reject) => {
    db.select("id")
      .from("room")
      .then((roomIds) => {
        resolve(roomIds);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = {
  createRoom,
  addUserToRoom,
  getRoomsWithMessages,
  getRoomsId,
};
