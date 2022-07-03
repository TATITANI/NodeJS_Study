const express = require('express')
require("./db/mongoose")
const User = require('./models/user')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/user', (req, res) => {
    
    console.log(req.body)
    const user = new User(req.body)
    user.save().then(() => {
        res.send(user)
        console.log("응답 성공")
    }).catch((err)=>{
        res.status(400).send(err)
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})

