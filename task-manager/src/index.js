const express = require('express')
require("./db/mongoose")
const User = require('./models/user')
const Task = require('./models/task')
const UserRouter = require('./routers/user')
const TaskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(TaskRouter)
app.use(UserRouter)


app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})


// MongoDB 실행 : D:/mongodb/bin/mongod.exe --dbpath=D:/mongodb-data
//실행 명령어 : nodemon src/index.js 
