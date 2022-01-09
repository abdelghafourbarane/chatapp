const bcrypt = require("bcrypt");

const { handleUserRegister } = require("../../controllers/user.controller");

const httpRegister = (req, res) => {
  handleUserRegister(req, res, bcrypt);
};

module.exports = { httpRegister };
