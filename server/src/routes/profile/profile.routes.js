const { getCurrentUser } = require("./profile.controller");

const profileRouter = require("express").Router();

profileRouter.get("/", getCurrentUser);

module.exports = {
  profileRouter,
};
