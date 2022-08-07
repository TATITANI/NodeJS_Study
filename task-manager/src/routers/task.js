const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/tasks', auth, async (req,res) =>{
    // const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try{
        await task.save()
        res.send(task)
    }catch(e){
        res.status(400).send(err)
        console.log(`task post err : ${err}`)
    }
})

router.get('/tasks', auth, async (req,res) =>{
    
    try{
        const user = await req.user.populate('tasks')
        res.send(user.tasks)

    }catch(e){
        res.status(500).send()
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    console.log(req.params)
    const _id = req.params.id
    try{
        const task = await Task.findOne({_id, owner : req.user._id})

        if (!task) {
            return res.status(404).send() 
        }
        console.log(task)
        res.send(task)    
    }catch(e){
        res.status(500).send()
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    console.log(`keys : ${updates}`) // 리퀘스트의 키값

    const allowedUpdates = ['description' ,'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidOperation){
        return res.status(400).send({error : 'invalid key'})
    }
    
    try{
        const task = await Task.findOne({_id : req.params.id, owner : req.user._id})
        if(!task){
            return res.status(404).send()
        }

        updates.forEach((update)=> task[update] = req.body[update])
        await task.save()

        // new : ture => 변경한 데이터 반환
        // runValidators : 스키마에 정의한 validation 동작
        // // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators :true})

        res.send(task)

    }catch(e){
        res.status(400).send(e)
    }

})


router.delete('/tasks/:id', auth,  async (req, res)=>{
    try{
        const task = await Task.findByIdAndDelete({_id : req.params.id, 
            owner : req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)

    }catch(e){
        res.status(500).send(e)
    }
})


module.exports = router