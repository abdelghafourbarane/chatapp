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
    db.select(
      "room.id as room_id",
      "users.username",
      "room.created_by",
      "room.room_name"
    )
      .from("room")
      .innerJoin("users", "users.id", "room.created_by")
      .then((rooms) => {
        const roomsToReturn = Promise.all(
          rooms.map((room) => {
            return db
              .raw(
                `SELECT m.id AS "message_id", sent_on,content,username AS "sender_name"
                  FROM message AS m 
                  INNER JOIN users AS u ON u.id=m.sender_id WHERE m.room_id=?
                  ORDER BY sent_on`,
                [room.room_id]
              )
              .then((messages) => {
                return {
                  room_id: room.room_id,
                  room_name: room.room_name,
                  created_at: room.created_at,
                  created_by: room.username,
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

const deleteRoom = (room_id) => {
  return new Promise((resolve, reject) => {
    db.transaction((trx) => {
      trx("message")
        .where("room_id", room_id)
        .del()
        .then(() => {
          return trx("room")
            .where("id", room_id)
            .del()
            .returning("*")
            .then((room) => {
              resolve(room[0]); //it resolves room deleted
            });
        })
        .then(trx.commit)
        .catch(trx.rollback);
    }).catch((err) => {
      reject(err);
    });
  });
};

module.exports = {
  createRoom,
  addUserToRoom,
  getRoomsWithMessages,
  getRoomsId,
  deleteRoom,
};
