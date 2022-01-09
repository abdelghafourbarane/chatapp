const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const loginRoutes = require("./routes/login/login.routes");
const registerRoutes = require("./routes/register/register.routes");

dotenv.config();

const PORT = 8000 || process.env.PORT;

const app = express();

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

app.listen(PORT, () => {
  console.log("backend listening on PORT : ", PORT);
});
