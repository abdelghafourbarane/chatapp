const bcrypt = require("bcrypt");

const { getUser } = require("../../models/user.model");
const {
  handlePasswordUpdate,
  handleUsernameUpdate,
} = require("../../controllers/user.controller");

const getCurrentUser = (req, res) => {
  const { userId } = req; // the userid is set by the middleware
  getUser(userId)
    .then(({ email, username, joined }) => {
      res.status(200).json({ email, username, joined });
    })
    .catch((err) => {
      res.status(400).json("An error occured during user retrieving ");
    });
};

const updateCurrentPassword = (req, res) => {
  handlePasswordUpdate(req, res, bcrypt);
};

const updateUsername = (req, res) => {
  handleUsernameUpdate(req, res);
};

module.exports = {
  getCurrentUser,
  updateCurrentPassword,
  updateUsername,
};
