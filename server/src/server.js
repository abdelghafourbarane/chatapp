const http = require("http");
const { Server } = require("socket.io");

const { app } = require("./app");
const { handleSocket } = require("./services/socket");

const PORT = 8000 || process.env.PORT;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
handleSocket(io);

server.listen(PORT, () => {
  console.log("server listening on PORT : ", PORT);
});

module.exports = {
  server,
};
