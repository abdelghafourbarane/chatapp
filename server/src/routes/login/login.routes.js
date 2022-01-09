const express = require("express");

const { httpLogin } = require("./login.controller");

const loginRoutes = express.Router();

loginRoutes.post("/", httpLogin);

module.exports = loginRoutes;
