const knex = require("knex");
const dotenv = require("dotenv");

dotenv.config();

const db = knex({
  client: "pg",
  connection: {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
});

module.exports = { db };
