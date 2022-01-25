const path = require("path")
const express = require("express")
const hbs = require("hbs")

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
    aboutText: "This is aboout Text",
    title: "About Page",
    name: "woong_about",
  })
})

app.get("/weather", (req, res) => {
  res.send({
    forecast: "It is snowing",
    lcoation: "mulgeum",
  })
})

app.listen(3000, () => {
  console.log("Server is up on port 3000.")
})
