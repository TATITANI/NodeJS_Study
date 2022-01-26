const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geoCode = require("./utils/geocode")
const weather = require("./utils/weather")

const app = express()

//define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewPath = path.join(__dirname, "../templates/views")
const partialPath = path.join(__dirname, "../templates/partials")

console.log(__dirname)
console.log(publicDirectoryPath)

// Setup handlerbars engine and views location
app.set("view engine", "hbs")
app.set("views", viewPath)
// 템플릿 재사용
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "woong",
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

  geoCode(req.query.address)
  // NOTE: 화살표 함수 대괄호를 적지 않으면 return처리됨. 
  // 대괄호치면 return weather~로 작성.
  .then( ( ...data) => 
    weather(...data)
  )
  .then(temperature => {
    res.send({
      forecast: "It is snowing",
      address: req.query.address,
      title: "Weather",
      name: "woong",
      temperature : temperature,
    })
  })
  .catch((err) => res.send({
    error : err
  }))
  
  // res.render("index", {
  //   forecast: "It is snowing",
  //   location: "mulgeum",
  //   address: req.query.address,
  //   title: "Weather",
  //   name: "woong",
  // })
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

app.listen(3000, () => {
  console.log("Server is up on port 3000.")
})

// 터미널 실행 명령어 : nodemon src/app.js js, hbs
