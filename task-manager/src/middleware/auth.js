const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) =>{
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const secretKey = 'thisismynewcourse'
        const decoded = jwt.verify(token, secretKey)
        // console.log(`decoded : ${ JSON.stringify(decoded) }`)
        // generateAutoToken에서 유저의 _id를 sign 했기 때문에 디코드 데이터에 _id가 있는 것.
        const user = await User.findOne({_id : decoded._id, 'tokens.token' : token} )

        if(!user){
            throw new Error()
        }

        req.token = token
        req.user = user
        next()

    }catch(e){
        res.status(401).send({error : 'Please authenticate. ' + e})
    }
 }

 module.exports = auth
