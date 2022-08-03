const express = require('express')
const User = require('../models/user')

const router = new express.Router()
 
router.post('/user', async (req, res) => {
    
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
router.get('/user', async (req, res) => {
    // 모든 document 조회
    try{
        const users = await User.find({})
        res.send(users)
    }catch(err){
        res.status(500).send(err)
    }
})

router.get('/user/:id', async (req, res) => {
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

router.patch('/user/:id', async (req, res) =>{
    const updates = Object.keys(req.body)
    console.log(`keys : ${updates}`) // 리퀘스트의 키값

    const allowedUpdates = ['name' ,'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidOperation){
        return res.status(400).send({error : 'invalid key'})
    }
    
    try{
        
        const user = await User.findById(req.params.id)
        updates.forEach((update) => user[update] = req.body[update])

        await user.save()

        // new : ture => 변경한 데이터 반환
        // runValidators : 스키마에 정의한 validation 동작
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators :true})
        if(!user){
            return res.status(404).send()
        }
        res.send(user)

    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/user/:id', async (req,res)=>{
    
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)

    }catch(e){
        res.status(500).send(e)
    }
})

module.exports = router