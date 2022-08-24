const express = require('express')

const app = express()
app.use(express.json())

const publicDirectoryPath = path.join(__dirname, "../public")
// Setup static directory to server  
// static 미들웨어는 특정 디렉토리 아래에 있는 폴더와 파일들을 특정 경로로 접근할 수 있도록 만들어준다.
// => partial 사용 가능
app.use(express.static(publicDirectoryPath))

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})

//실행 명령어 : nodemon src/index.js 
