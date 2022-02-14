const { redisClient } = require("../services/redis");

const requireAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json("Unauthorized");
  }
  return redisClient
    .get(authorization)
    .then((userId) => {
      if (userId) {
        req.userId = userId;
        return next();
      }
      return res.status(401).json("Unauthorized");
    })
    .catch((err) => {
      return res
        .status(401)
        .json("An error occured during authorization verification");
    });
};

module.exports = {
  requireAuth,
};
