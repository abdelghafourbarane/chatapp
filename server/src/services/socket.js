const handleSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("a user is connected,socket id is : ", socket.id);
    socket.on("sendMessage", (data) => {
      console.log("receiving data: ", data);
      socket.broadcast.emit("newMessage", data);
    });
    socket.on("disconnect", () => {
      console.log("a user is disconnected");
    });
  });
};

module.exports = {
  handleSocket,
};
