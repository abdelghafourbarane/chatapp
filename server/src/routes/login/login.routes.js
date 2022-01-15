const express = require("express");

const { httpLogin, httpLogout } = require("./login.controller");

const loginRoutes = express.Router();

loginRoutes.post("/", httpLogin);
loginRoutes.delete("/", httpLogout);

module.exports = loginRoutes;
