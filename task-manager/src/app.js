const express = require('express')
require("./db/mongoose")
const User = require('./models/user')
const Task = require('./models/task')
const UserRouter = require('./routers/user')
const TaskRouter = require('./routers/task')

const app = express()

app.use(express.json())
app.use(TaskRouter)
app.use(UserRouter)

module.exports = app