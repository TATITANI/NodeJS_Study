const express = require('express')
require("./db/mongoose")
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())



app.post('/user', async (req, res) => {
    
    console.log(`post호출 : ${JSON.stringify(req.body)}`)

    const user = new User(req.body)
    
    try{
        await user.save()
        res.send(user)
    } catch(e){
        res.status(400).send(err)
    }
    
    // user.save().then(() => {
    //     res.send(user)
    //     console.log("응답 성공")
    // }).catch((err)=>{
    //     res.status(400).send(err)
    // })
})

app.post('/tasks', async (req,res) =>{
    const task = new Task(req.body)
    try{
        await task.save()
        res.send(task)
    }catch(e){
        res.status(400).send(err)
        console.log(`task post err : ${err}`)
    }
})

app.get('/tasks', async (req,res) =>{
    try{
        const tasks = await Task.find({})    
        res.send(tasks)
    }catch(e){
        res.status(500).send()
    }
})

app.get('/tasks/:id', async (req, res) => {
    console.log(req.params)
    const _id = req.params.id
    try{
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send() 
        }
        console.log(task)
        res.send(task)    
    }catch(e){
        res.status(500).send()
    }
})

app.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    console.log(`keys : ${updates}`) // 리퀘스트의 키값

    const allowedUpdates = ['description' ,'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidOperation){
        return res.status(400).send({error : 'invalid key'})
    }
    
    try{
        // new : ture => 변경한 데이터 반환
        // runValidators : 스키마에 정의한 validation 동작
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators :true})

        if(!task){
            return res.status(404).send()
        }

        res.send(task)

    }catch(e){
        res.status(400).send(e)
    }

})

app.get('/user', async (req, res) => {
    // 모든 document 조회
    try{
        const users = await User.find({})
        res.send(users)
    }catch(err){
        res.status(500).send(err)
    }
})

app.get('/user/:id', async (req, res) => {
    const _id = req.params.id
    
    const user = await User.findById((_id))
    try{
        if(!user){
            return res.status(400).send()
        }
        res.send(user)
    }catch(e){
        res.status(500).send(e)
    }

    console.log(req.params)
    
})

app.patch('/user/:id', async (req, res) =>{
    const updates = Object.keys(req.body)
    console.log(`keys : ${updates}`) // 리퀘스트의 키값

    const allowedUpdates = ['name' ,'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidOperation){
        return res.status(400).send({error : 'invalid key'})
    }
    
    try{
        // new : ture => 변경한 데이터 반환
        // runValidators : 스키마에 정의한 validation 동작
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators :true})
        if(!user){
            return res.status(404).send()
        }
        res.send(user)

    }catch(e){
        res.status(400).send(e)
    }
})



app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})


// MongoDB 실행 : D:/mongodb/bin/mongod.exe --dbpath=D:/mongodb-data
//실행 명령어 : nodemon src/index.js