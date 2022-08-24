const express = require('express')

const app = express()

app.use(express.json())

console.log('ok')
const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})

//실행 명령어 : nodemon src/index.js 
