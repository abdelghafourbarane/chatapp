const { redisClient } = require("../services/redis");

const requireAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json("No header authorization found");
  }
  return redisClient
    .get(authorization)
    .then((userId) => {
      req.userId = userId;
      return next();
    })
    .catch((err) => {
      return res.status(401).json("Unauthorized by redis");
    });
};

module.exports = {
  requireAuth,
};
