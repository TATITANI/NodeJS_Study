const express = require('express')
require("./db/mongoose")
const User = require('./models/user')
const Task = require('./models/task')
const UserRouter = require('./routers/user')
const TaskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000


const multer = require('multer')
const upload = multer({
    dest : 'images',
    // 파일 크기 제한
    limits : {
        fileSize: 1000000, //바이트
    },
    fileFilter(req, file, cb){
        // if (!file.originalname.endsWith('.pdf')) {
        // / \.(doc|docx)$/   =>   정규표현식
        if(!file.originalname.match(/ \.(doc|docx)$/)  ){
            return cb(new Error('Please upload a Word document'))
        }
        cb(undefined, true)
    }

})

app.post('/upload', upload.single('upload'), (req, res)=>{
    res.send()
})




app.use(express.json())
app.use(TaskRouter)
app.use(UserRouter)


app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})


// MongoDB 실행 : D:/mongodb/bin/mongod.exe --dbpath=D:/mongodb-data
//실행 명령어 : nodemon src/index.js 