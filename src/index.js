const express = require("express")
const http = require("http")

const { init } = require("./config/io")
const taskRouter = require("./task/task.router")
const config = require("./config/config")

const app = express()
const server = http.createServer(app)
const io = init(server)

const port = config.port

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  req.io = io
  next()
})

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

app.use("/tasks", taskRouter)

io.on("connection", () => {
  io.emit("connection")
})

server.listen(port, function () {
  console.log(`Funcionando en el puerto ${port}!`)
})
