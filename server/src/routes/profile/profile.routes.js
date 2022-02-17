const {
  getCurrentUser,
  updateCurrentPassword,
  updateUsername,
} = require("./profile.controller");

const profileRouter = require("express").Router();

profileRouter.get("/", getCurrentUser);
profileRouter.put("/change_password", updateCurrentPassword);
profileRouter.put("/profile/change_username", updateUsername);

module.exports = {
  profileRouter,
};
