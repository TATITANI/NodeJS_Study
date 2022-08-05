const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) =>{
    try{
        const token = req.header('Authorization').replace('Bearer', '')
        const secretKey = 'thisismynewcourse'
        const decoded = jwt.verify(token, secretKey)
        console.log(`decoded : ${ JSON.stringify(decoded) }`)

        const user = await User.findOne({_id : decoded._id, 'tokens.token' : token} )

        if(!user){
            throw new Error()
        }
        
        req.user = user
        next()

    }catch(e){
        res.status(401).send({error : 'Please authenticate. '})
    }
 }

 module.exports = auth
