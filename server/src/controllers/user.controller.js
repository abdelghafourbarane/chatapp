const { addNewUser, getUserHash, getUser } = require("../models/user.model");

const handleUserRegister = (req, res, bcrypt) => {
  const { email, password, username } = req.body;
  if (!email || !username || !password) {
    res.status(400).json("incorrect form submission");
  }
  const hash = bcrypt.hashSync(password, parseInt(process.env.BCRYPT_SALT));
  addNewUser(username, email, hash)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(400).json("unable to register " + error);
    });
};

const handleUserLogin = (req, res, bcrypt) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json("incorrect form submission");
  }
  getUserHash(username) // get password hash from login table
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data.hash); // Compare password sent by user with hashed password
      // if the password match with the hashed one
      if (isValid) {
        getUser(data.id) // get user from users table using user id
          .then((user) => {
            res.status(200).json(user);
          })
          .catch(() =>
            res.status(400).json("an error has occured during authentication")
          );
      } else {
        res.status(400).json("Wrong Password");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("An error has occured during authentication");
    });
};

module.exports = {
  handleUserRegister,
  handleUserLogin,
};
