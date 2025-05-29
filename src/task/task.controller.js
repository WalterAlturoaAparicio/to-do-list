const taskService = require("./task.service")

module.exports = {
  createTask: async (req, res) => {
    try {
      const task = await taskService.createTask(req.body)
      req.io.emit("task-created", task)
      return res.status(201).json(task)
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error interno al crear la tarea" })
    }
  },

  getTasks: async (_req, res) => {
    try {
      const tasks = await taskService.getTasks()
      return res.status(200).json(tasks)
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error interno al obtener las tareas" })
    }
  },

  updateTask: async (req, res) => {
    try {
      const { id } = req.params
      const existingTask = await taskService.getTaskById(id)

      if (!existingTask) {
        return res.status(404).json({ message: "Tarea no encontrada" })
      }

      const updatedTask = await taskService.updateTask(existingTask, req.body)
      req.io.emit("task-updated", updatedTask)
      return res.status(200).json(updatedTask)
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error interno al actualizar la tarea" })
    }
  },

  deleteTask: async (req, res) => {
    try {
      const { id } = req.params
      const task = await taskService.getTaskById(id)

      if (!task) {
        return res.status(404).json({ message: "Tarea no encontrada" })
      }

      await taskService.deleteTask(id)
      req.io.emit("task-deleted", task)
      return res.status(200).json({ message: "Tarea eliminada correctamente" })
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error interno al eliminar la tarea" })
    }
  },
}
