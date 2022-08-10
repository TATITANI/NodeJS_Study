const express = require('express')
const sharp = require('sharp')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()
 
const multer = require('multer')

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
        res.status(400).send(e)
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

const upload = multer({
    // 주의 : dest(저장경로)옵션을 생략해야 파일이 디스크가 아닌 메모리에 저장됨.
    // dest : 'avatars',
    limits :{
        fileSize : 1000000
    },
    fileFilter(req, file, cb){
        // 정규표현식 : /내용/ 의 형식. $는 텍스트의 끝을 의미
        if( !file.originalname.match(/\.(jpg|jepg|png)$/)){
            return cb(new Error("Please Upload jpg, jpeg, png"))
        }
        cb(undefined, true)
    }
}) 

router.post('/user/me/avatar',auth, upload.single('avatar'),  async(req, res) =>{
    
    const buffer = await sharp(req.file.buffer)
    .resize({width: 250, height : 250}).png().toBuffer()
    req.user.avatar = buffer

    await req.user.save()
    res.send()
}, (err, req, res, next) =>{
    res.status(400).send({error: err.message})
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

router.delete('/user/me/avatar', auth, async (req,res)=>{
    req.user.avatar = undefined
    await req.user.save()
    res.status(200).send()

}, (err, req, res, next)=>{
    res.status(404).send({error: err.message})
})

router.get('/user/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user || !user.avatar) {
            throw new Error()
        }
        res.set('Content-Type', 'image/jpg')
        res.send(user.avatar)

    } catch (e) {
        res.status(404).send(e)
    }
})


module.exports = router

