const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()
 
router.post('/user', async (req, res) => {
    
    console.log(`post호출 : ${JSON.stringify(req.body)}`)

    const user = new User(req.body)
    try{
        await user.save() 
        token = user.generateAutoToken()

        res.status(201).send({user, token})
    } catch(err){
        res.status(400).send(err)
    }
    
})

// 비번 : red12345!
router.post('/user/login', async (req, res) =>{ 
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAutoToken()
        res.send({user, token})
    }catch(e){
        res.status(400).send()
    }

})

router.post('/user/logout', auth, async (req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    }catch(e){
        res.status(500).send()
    }
})

router.post(`/user/logoutAll`, auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()

        res.status(200).send()
    } catch (e) {
        res.status(500).send()
    }
})

// parameter : request 경로 -> middleware(auth) -> route handler 
router.get('/user/me',auth, async (req, res) => {
    res.send(req.user)
    
})


router.patch('/user/me', auth, async (req, res) =>{
    const updates = Object.keys(req.body)
    console.log(`keys : ${updates}`) // 리퀘스트의 키값

    const allowedUpdates = ['name' ,'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidOperation){
        return res.status(400).send({error : 'invalid key'})
    }
    
    try{        
        const user = req.user
        if(!user){
            return res.status(404).send()
        }
        updates.forEach((update) => user[update] = req.body[update])

        await user.save()
        res.send(user)

        // new : true => 변경한 데이터 반환
        // runValidators : 스키마에 정의한 validation 동작
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators :true})

    }catch(e){
        res.status(400).send(e)
    }

})

router.delete('/user/me', auth, async (req,res)=>{
    
    try{
        await req.user.remove()
        res.send(req.user)

    }catch(e){
        res.status(500).send(e)
    }
})

module.exports = router

