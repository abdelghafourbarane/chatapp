const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const loginRoutes = require("./routes/login/login.routes");
const registerRoutes = require("./routes/register/register.routes");
const { requireAuth } = require("./controllers/requireAuth");
const { profileRouter } = require("./routes/profile/profile.routes");
const { roomsRouter } = require("./routes/rooms/rooms.routes");
const { messagesRoutes } = require("./routes/messages/messages.routes");

const { handleSocket } = require("./services/socket");

dotenv.config();

const PORT = 8000 || process.env.PORT;

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

handleSocket(io);

app.use(morgan());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use("/login", loginRoutes);
app.use("/register", registerRoutes);
app.use("/profile", requireAuth, profileRouter);
app.use("/rooms", requireAuth, roomsRouter);
app.use("/messages", requireAuth, messagesRoutes);

server.listen(PORT, () => {
  console.log("backend listening on PORT : ", PORT);
});
