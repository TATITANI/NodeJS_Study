const path = require("path")
const express = require("express")
const hbs = require("hbs")
const bodyParser = require('body-parser')
const weather = require('../public/js/utils/weather')

//define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewPath = path.join(__dirname, "../templates/views")
const partialPath = path.join(__dirname, "../templates/partials")

const app = express()
// env : 환경변수
const port = process.env.PORT || 3000 // 포트가 없다면 3000 사용

console.log(__dirname)
console.log(publicDirectoryPath)

// Setup handlerbars engine and views location
app.set("view engine", "hbs")
app.set("views", viewPath)
// 템플릿 재사용
hbs.registerPartials(partialPath)

// body-parser : post의 req.body 데이터를 파싱하여 사용할 수 있게 함
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json())

// Setup static directory to server  
// static 미들웨어는 특정 디렉토리 아래에 있는 폴더와 파일들을 특정 경로로 접근할 수 있도록 만들어준다.
// => partial 사용 가능
app.use(express.static(publicDirectoryPath))

app.get("", (req, res) => {
  //render 1번째 인자 : views경로에서 사용할 hbs 파일명
  res.render("main", {
    title: "Weather App",
    name: "woong",
  })
  console.log('get : ', req.query)
})

app.post("", (req,res)=>{
  const postData = req.body
  weather.GetWeather(postData.address, postData.lat, postData.long)
  .then((weatherData) =>{1
    console.log('post weatherData : ', weatherData)
    res.send(weatherData)
  })
  .catch((result) =>{
    console.log('post error : ', result)
  })
})


app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "woong_about",
    aboutText: "This is aboout Text",
  })
})

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a address item",
    })
  }
 
})

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search item",
    })
  }
  console.log(req.query)
  res.send({
    products: [],
  })
})

// 해당 페이지 없는 경우
// get으로 페이지들을 모두 지정하고 마지막에 위치해야 정상 동작

app.get("/about/*", (req, res) => {
  res.render("404", {
    title: "Error about Page",
    name: "woong_error_about",
    errorMessage: "404 에러임",
  })
})

app.get("*", (req, res) => {
  res.render("404", {
    title: "Error Page",
    name: "woong_error",
    errorMessage: "404 에러임",
  })
})

app.listen(port, () => {
  console.log("Server is up on port 3000.")
})

// 터미널 실행 명령어 : nodemon src/main.js js, hbs
