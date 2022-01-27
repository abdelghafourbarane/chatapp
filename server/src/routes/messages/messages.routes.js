const messagesRoutes = require("express").Router();

const {
  handleGetMessages,
  handleAddMessage,
} = require("./messages.controller");

messagesRoutes.get("/", handleGetMessages);
messagesRoutes.post("/", handleAddMessage);

module.exports = {
  messagesRoutes,
};
