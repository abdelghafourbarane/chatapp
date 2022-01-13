const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const { redisClient } = require("../services/redis");
const { addNewUser, getUserHash, getUser } = require("../models/user.model");

dotenv.config();
const handleUserRegister = (req, res, bcrypt) => {
  const { email, password, username } = req.body;
  if (!email || !username || !password) {
    res.status(400).json("incorrect form submission");
  }
  const hash = bcrypt.hashSync(password, parseInt(process.env.BCRYPT_SALT));
  addNewUser(username, email, hash)
    .then((user) => {
      saveAuthToken(user)
        .then((token) => {
          res.status(200).json(token);
        })
        .catch((err) => {
          res.status(400).json("error occured during token save " + err);
        });
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
            saveAuthToken(user)
              .then((token) => {
                res.status(200).json(token);
              })
              .catch((err) =>
                res.status(400).json("error occured during token save " + err)
              );
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

const signToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET);
};

const saveAuthToken = (user) => {
  return new Promise((resolve, reject) => {
    const { username, email, id } = user;
    const token = signToken({ username, email });
    redisClient
      .set(token, id)
      .then((reply) => {
        resolve({ token });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = {
  handleUserRegister,
  handleUserLogin,
};
