const dotenv = require("dotenv")
dotenv.config()

module.exports = {
  port: process.env.PORT || 3000,
  storage: process.env.STORAGE || "sqlite::memory:",
}
