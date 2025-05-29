const { DataTypes } = require("sequelize")
const db = require("../config/database")

const Task = db.define("Task", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "pending",
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
})

module.exports = Task
