const Task = require("./task.model")

module.exports = {

  createTask: async (req, res) => {
    const { title, description } = req.body
    const task = await Task.create({ title, description })
    req.io.emit("task-created", task)
    return res.status(201).json(task)
  },

  getTasks: async (req, res) => {
    const tasks = await Task.findAll()
    res.status(200).json(tasks)
  },

  updateTask: async (req, res) => {
    const { id } = req.params
    const { title, description, status } = req.body
    const task = await Task.findByPk(id)
    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }
    task.title = title || task.title
    task.description = description || task.description
    task.status = status || task.status
    await task.save()

    req.io.emit("task-updated", task);
    res.status(200).json(task)
  },

  deleteTask: async (req, res) => {
    const { id } = req.params
    const task = await Task.findByPk(id)
    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }
    await Task.destroy({ where: { id } })
    req.io.emit("task-deleted", task)
    res.status(204).json({ message: "Task deleted" })
  },
}
