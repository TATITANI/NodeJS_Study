const path = require("path")
const express = require("express")
const hbs = require("hbs")
const { mainModule } = require("process")

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
  res.render("index", {
    forecast: "It is snowing",
    location: "mulgeum",
    name: "woong_weather",
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

// 터미널 명령어 : nodemon src/app.js js, hbs
