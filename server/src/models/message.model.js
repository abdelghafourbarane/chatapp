const { db } = require("../services/postgres");

const addMessage = (sender_id, room_id, content) => {
  return new Promise((resolve, reject) => {
    db.insert({
      sent_on: new Date(),
      sender_id: sender_id,
      room_id: room_id,
      content: content,
    })
      .into("message")
      .returning("*")
      .then((message) => {
        resolve(message[0]);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getMessagesByRoomId = (room_id) => {
  return new Promise((resolve, reject) => {
    db.select("*")
      .from("message")
      .where("room_id", "=", room_id)
      .then((messages) => {
        resolve(messages);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = {
  addMessage,
  getMessagesByRoomId,
};
