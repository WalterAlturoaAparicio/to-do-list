const Task = require("./task.model")

module.exports = {
  createTask: async (data) => {
    return await Task.create(data)
  },

  getTasks: async () => {
    return await Task.findAll()
  },

  getTaskById: async (id) => {
    return await Task.findByPk(id)
  },

  updateTask: async (task, data) => {
    task.title = data.title ?? task.title
    task.description = data.description ?? task.description
    task.status = data.status ?? task.status
    await task.save()
    return task
  },

  deleteTask: async (id) => {
    return await Task.destroy({ where: { id } })
  },
}
