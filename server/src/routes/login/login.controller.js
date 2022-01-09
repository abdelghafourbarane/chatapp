const bcrypt = require("bcrypt");

const { handleUserLogin } = require("../../controllers/user.controller");

const httpLogin = (req, res) => {
  handleUserLogin(req, res, bcrypt);
};

module.exports = {
  httpLogin,
};
