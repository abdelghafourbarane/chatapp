const { getUser } = require("../../models/user.model");

const getCurrentUser = (req, res) => {
  const { userId } = req; // the userid is set by the middleware
  console.log("the user id returned by requireAuth middleware: ", userId);
  getUser(userId)
    .then(({ email, username, joined }) => {
      res.status(200).json({ email, username, joined });
    })
    .catch((err) => {
      res.status(400).json("An error occured during user retrieving ");
    });
};

module.exports = {
  getCurrentUser,
};
