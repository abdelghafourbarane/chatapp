const { redisClient } = require("../../services/redis");
const { getUser } = require("../../models/user.model");

const getCurrentUser = (req, res) => {
  const { authorization } = req.headers;
  console.log("in the getcurrentuser function");
  redisClient.get(authorization).then((userId) => {
    getUser(userId)
      .then(({ email, username, joined }) => {
        res.status(200).json({ email, username, joined });
      })
      .catch((err) => {
        res.status(400).json("An error occured during user retrieving ");
      });
  });
  //   , (err, userId) => {
  //   getUser(userId)
  //     .then(({ email, username, joined }) => {
  //       res.status(200).json({ email, username, joined });
  //     })
  //     .catch((err) => {
  //       res.status(400).json("An error occured during user retrieving ");
  //     });
  // });
};

module.exports = {
  getCurrentUser,
};
