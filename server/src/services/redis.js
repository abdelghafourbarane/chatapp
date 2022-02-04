// const redis = require("redis");
// const redisClient = redis.createClient();
// (async () => {
//   redisClient.on("error", (err) => console.log("Redis Client Error", err));

//   await redisClient.connect();
// })();
const Redis = require("ioredis");

const redisClient = new Redis();

module.exports = { redisClient };
