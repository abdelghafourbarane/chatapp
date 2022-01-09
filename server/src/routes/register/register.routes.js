const express = require("express");

const { httpRegister } = require("./register.controller");

const registerRoutes = express.Router();

registerRoutes.post("/", httpRegister);

module.exports = registerRoutes;
