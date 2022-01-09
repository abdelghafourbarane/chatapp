const { db } = require("../services/postgres");

const getUserHash = (username) => {
  return new Promise((resolve, reject) => {
    db.select("id", "hash")
      .from("login")
      .where("username", "=", username)
      .then((data) => {
        resolve(data[0]);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// get user from users table using by id
const getUser = (id) => {
  return new Promise((resolve, reject) => {
    db.select("*")
      .from("users")
      .where("id", "=", id)
      .then((data) => {
        resolve(data[0]);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const addNewUser = (username, email, hash) => {
  return new Promise((resolve, reject) => {
    db.transaction((trx) => {
      trx
        .insert({
          hash: hash,
          username: username,
        })
        .into("login")
        .returning("id")
        .then((loginId) => {
          return trx("user")
            .returning("*")
            .insert({
              id: loginId[0],
              email: email,
              username: username,
              joined: new Date(),
            })
            .into("users")
            .then((user) => {
              resolve(user[0]);
            });
        })
        .then(trx.commit)
        .catch(trx.rollback);
    }).catch((err) => {
      reject(err);
    });
  });
};

module.exports = {
  addNewUser,
  getUserHash,
  getUser,
};
