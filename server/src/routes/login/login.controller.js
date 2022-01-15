const bcrypt = require("bcrypt");

const {
  handleUserLogin,
  handleUserLogout,
} = require("../../controllers/user.controller");

const httpLogin = (req, res) => {
  handleUserLogin(req, res, bcrypt);
};

const httpLogout = (req, res) => {
  handleUserLogout(req, res);
};

module.exports = {
  httpLogin,
  httpLogout,
};
