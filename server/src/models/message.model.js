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
      .then((message) => {
        resolve(message[0]);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = {
  addMessage,
};
