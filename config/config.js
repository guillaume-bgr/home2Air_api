require('dotenv').config();
module.exports = {
  "development": {
      "username": process.env.DATABASE_USERNAME,
      "password": process.env.DATABASE_PASSWORD,
      "database": process.env.DATABASE_NAME,
      "host": process.env.DATABASE_HOST,
      "port": process.env.DATABASE_PORT,
      "dialect": "mysql"
  },
  "test": {
    "username": "root",
      "password": "secret",
      "database": "home2air_test",
      "dialect": "mysql"
  }
}
