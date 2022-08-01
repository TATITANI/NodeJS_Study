const express = require('express')
require("./db/mongoose")
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/user', (req, res) => {
    
    console.log(`post호출 : ${JSON.stringify(req.body)}`)
    const user = new User(req.body)
    user.save().then(() => {
        res.send(user)
        console.log("응답 성공")
    }).catch((err)=>{
        res.status(400).send(err)
    })
})

app.post('/tasks', (req,res) =>{
    const task = new Task(req.body)
    
    task.save().then( () => {
        res.send(task)
    }).catch( (err) => {
        res.status(400).send(err)
        console.log(`task post err : ${err}`)
    })
    
})

app.get('/tasks',(req,res) =>{
    Task.find({}).then((tasks)=>{
        res.send(tasks)
    }).catch((err)=>{
        res.status(500).send()
    })
})

app.get('/tasks/:id', (req, res) => {
    console.log(req.params)
    const _id = req.params.id
    
    Task.findById(_id).then((task) => {
        if (!task) {
            return res.status(404).send() 
        }
        res.send(task)

    }).catch((err) => {
        res.status(500).send()
    })
})


app.get('/user', (req, res) => {
    // 모든 document 조회
    User.find({}).then((users) =>{
        res.send(users)
    }).catch((err)=>{
        res.status(500).send(err)
    })
})

app.get('/user/:id', (req, res)=>{
    const _id = req.params.id
    
    User.findById((_id)).then((user)=>{
        if(!user){
            return res.status(400).send()
        }
        res.send(user)
    }).catch((e)=>{
        res.status(500).send(e)
    })
    console.log(req.params)
    
})


app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})

// MongoDB 실행 : D:/mongodb/bin/mongod.exe --dbpath=D:/mongodb-data
//실행 명령어 : nodemon src/index.js