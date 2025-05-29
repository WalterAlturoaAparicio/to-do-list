const taskService = require("../src/task/task.service")
const Task = require("../src/task/task.model")

jest.mock("../src/task/task.model")

describe("task.service", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test("createTask debe crear una nueva tarea", async () => {
    const data = { title: "Test", description: "Desc" }
    Task.create.mockResolvedValue(data)

    const result = await taskService.createTask(data)

    expect(Task.create).toHaveBeenCalledWith(data)
    expect(result).toEqual(data)
  })

  test("getTasks debe devolver todas las tareas", async () => {
    const mockTasks = [{ id: 1 }, { id: 2 }]
    Task.findAll.mockResolvedValue(mockTasks)

    const result = await taskService.getTasks()

    expect(Task.findAll).toHaveBeenCalled()
    expect(result).toEqual(mockTasks)
  })

  test("getTaskById debe devolver una tarea por ID", async () => {
    const mockTask = { id: 1 }
    Task.findByPk.mockResolvedValue(mockTask)

    const result = await taskService.getTaskById(1)

    expect(Task.findByPk).toHaveBeenCalledWith(1)
    expect(result).toEqual(mockTask)
  })

  test("updateTask debe actualizar la tarea", async () => {
    const mockTask = {
      title: "Old",
      description: "Old desc",
      status: "pending",
      save: jest.fn().mockResolvedValue(true),
    }

    const updatedData = { title: "New", description: "New desc", status: "done" }

    const result = await taskService.updateTask(mockTask, updatedData)

    expect(mockTask.title).toBe("New")
    expect(mockTask.description).toBe("New desc")
    expect(mockTask.status).toBe("done")
    expect(mockTask.save).toHaveBeenCalled()
    expect(result).toBe(mockTask)
  })

  test("deleteTask debe eliminar la tarea", async () => {
    Task.destroy.mockResolvedValue(1)

    const result = await taskService.deleteTask(1)

    expect(Task.destroy).toHaveBeenCalledWith({ where: { id: 1 } })
    expect(result).toBe(1)
  })
})
