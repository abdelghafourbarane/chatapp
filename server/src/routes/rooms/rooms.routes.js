const roomsRouter = require("express").Router();

const {
  handleRoomAdd,
  handleGetRoomsWithMessages,
  handleRoomDelete,
} = require("./rooms.controller");

roomsRouter.post("/", handleRoomAdd);
roomsRouter.get("/", handleGetRoomsWithMessages);
roomsRouter.delete("/", handleRoomDelete);

module.exports = {
  roomsRouter,
};
