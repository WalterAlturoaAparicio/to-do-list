const { Sequelize } = require("sequelize");
const config = require("./config");

const db = new Sequelize({
    dialect: 'sqlite',
    storage: config.storage
});

module.exports = db;