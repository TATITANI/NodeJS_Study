const express = require('express')
const http = require('http')
const path = require("path")
const socketio = require('socket.io')

const app = express() 
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT
const publicDirectoryPath = path.join(__dirname, "../public")

app.use(express.json())

// Setup static directory to server  
// static 미들웨어는 특정 디렉토리 아래에 있는 폴더와 파일들을 특정 경로로 접근할 수 있도록 만들어준다.
// => partial 사용 가능
app.use(express.static(publicDirectoryPath))

app.get('/', (req,res)=>{
    console.log(`query : ${JSON.stringify(req.query)}`)
})


io.on('connection', (socket) => {
    console.log("New Websocket connection")
    
    socket.emit('connect message', "welcome")

    //자신을 제외하고 전송
    socket.broadcast.emit('msg', 'a new user has joined')
    
    //수신
    socket.on('msg', (msg) => {
        console.log(`msg 수신 : ${msg}`)
        //단일 커넥션에 전송
        io.emit('msg', msg)
 
        // 모든 커넥션에 전송
        // io.emit('countUpdated', count)
    })
    socket.on('sendLocation', (pos) => {
        io.emit('msg', `pos : ${pos.latitude} , ${pos.longitude} `)
    })
    
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})

//실행 명령어 : nodemon src/index.js 
