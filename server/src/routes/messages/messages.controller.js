const {
  getMessagesByRoomId,
  addMessage,
} = require("../../models/message.model");
const { prepareMessagesList } = require("../../utils/models.helpers");

const handleGetMessages = (req, res) => {
  const { room_id } = req.body;
  getMessagesByRoomId(room_id)
    .then((messages) => {
      const messages_to_send = prepareMessagesList(messages);
      res.status(200).json(messages_to_send);
    })
    .catch((err) => {
      res.status(400).json("An error occured during messages retieving");
    });
};

const handleAddMessage = (req, res) => {
  const { room_id, content } = req.body;
  const sender_id = req.userId;

  addMessage(sender_id, room_id, content)
    .then((message) => {
      res.status(200).json(message);
    })
    .catch((err) => {
      res.status(400).json("An error occured during sending the message");
    });
};

module.exports = {
  handleGetMessages,
  handleAddMessage,
};
