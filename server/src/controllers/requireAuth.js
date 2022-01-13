const { redisClient } = require("../services/redis");

const requireAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json("No header authorization found");
  }
  return redisClient
    .get(authorization)
    .then(() => {
      console.log("You shall pass");
      return next();
    })
    .catch((err) => {
      return res.status(401).json("Unauthorized by redis");
    });
  //   , (err, reply) => {
  //   if (err || !reply) {
  //     return res.status(401).json("Unauthorized by redis");
  //   }

  //   console.log("You shall pass");
  //   return next();
  // });
};

module.exports = {
  requireAuth,
};
