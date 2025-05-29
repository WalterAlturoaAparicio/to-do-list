const express = require("express")
const taskController = require("./task.controller")
const router = express.Router()

// Post a task
router.post("/", function (req, res) {
  return taskController.createTask(req, res)
})

// Get all tasks
router.get("/", function (req, res) {
  return taskController.getTasks(req, res)
})

// Put a task by id
router.put("/:id", function (req, res) {
  return taskController.updateTask(req, res)
})

// Delete a task by id
router.delete("/:id", function (req, res) {
  return taskController.deleteTask(req, res)
})

module.exports = router
