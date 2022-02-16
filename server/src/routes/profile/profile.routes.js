const {
  getCurrentUser,
  updateCurrentPassword,
} = require("./profile.controller");

const profileRouter = require("express").Router();

profileRouter.get("/", getCurrentUser);
profileRouter.put("/", updateCurrentPassword);

module.exports = {
  profileRouter,
};
