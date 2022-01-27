const roomsRouter = require("express").Router();

const {
  handleRoomAdd,
  handleGetRoomsWithMessages,
} = require("./rooms.controller");

roomsRouter.post("/", handleRoomAdd);
roomsRouter.get("/", handleGetRoomsWithMessages);

module.exports = {
  roomsRouter,
};
