require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME_DEVELOPMENT || "postgres",
    password: process.env.DB_PASSWORD_DEVELOPMENT || "123456",
    database: process.env.DB_NAME_DEVELOPMENT || "binarch9",
    host: process.env.DB_HOST_DEVELOPMENT || "127.0.0.1",
    dialect: process.env.DB_DIALECT_DEVELOPMENT || "postgres",
  },
  test: {
    username: process.env.DB_USERNAME_TEST,
    password: process.env.DB_PASSWORD_TEST,
    database: process.env.DB_TEST,
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: process.env.DB_USERNAME_PRODUCTION,
    password: process.env.DB_PASSWORD_PRODUCTION,
    database: process.env.DB_PRODUCTION,
    host: "127.0.0.1",
    dialect: "postgres",
  },
};
