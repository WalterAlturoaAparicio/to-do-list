const express = require("express")
const request = require("supertest")
const taskController = require("../src/task/task.controller")
const taskService = require("../src/task/task.service")

jest.mock("../src/task/task.service")

const app = express()
app.use(express.json())

// Fake IO
const mockIO = { emit: jest.fn() }

app.post("/tasks", (req, res) => {
  req.io = mockIO
  return taskController.createTask(req, res)
})

app.get("/tasks", (req, res) => {
  req.io = mockIO
  return taskController.getTasks(req, res)
})

app.put("/tasks/:id", async (req, res) => {
  req.io = mockIO
  return taskController.updateTask(req, res)
})

app.delete("/tasks/:id", async (req, res) => {
  req.io = mockIO
  return taskController.deleteTask(req, res)
})

describe("task.controller", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test("POST /tasks debe crear una tarea y emitir evento", async () => {
    const taskData = { title: "Task", description: "Desc" }
    taskService.createTask.mockResolvedValue(taskData)

    const res = await request(app).post("/tasks").send(taskData)

    expect(res.status).toBe(201)
    expect(res.body).toEqual(taskData)
    expect(mockIO.emit).toHaveBeenCalledWith("task-created", taskData)
  })

  test("GET /tasks debe devolver lista de tareas", async () => {
    const tasks = [{ id: 1 }, { id: 2 }]
    taskService.getTasks.mockResolvedValue(tasks)

    const res = await request(app).get("/tasks")

    expect(res.status).toBe(200)
    expect(res.body).toEqual(tasks)
  })

  test("PUT /tasks/:id debe actualizar una tarea existente", async () => {
    const task = {
      id: 1,
      title: "Old",
      description: "Old desc",
      status: "pending",
    }

    const updated = {
      ...task,
      save: jest.fn().mockResolvedValue(true),
    }

    taskService.getTaskById.mockResolvedValue(updated)
    taskService.updateTask.mockResolvedValue(updated)

    const res = await request(app).put("/tasks/1").send({
      title: "Updated",
      description: "Updated",
      status: "done",
    })

    expect(res.status).toBe(200)
    expect(taskService.updateTask).toHaveBeenCalled()
    expect(mockIO.emit).toHaveBeenCalledWith("task-updated", updated)
  })

  test("DELETE /tasks/:id debe eliminar una tarea", async () => {
    const task = { id: 1 }
    taskService.getTaskById.mockResolvedValue(task)
    taskService.deleteTask.mockResolvedValue(1)

    const res = await request(app).delete("/tasks/1")

    expect(res.status).toBe(200)
    expect(mockIO.emit).toHaveBeenCalledWith("task-deleted", task)
  })
})
