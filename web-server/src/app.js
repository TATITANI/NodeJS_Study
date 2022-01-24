const path = require("path")
const express = require("express")

const app = express()
const publicDirectoryPath = path.join(__dirname, "../public")
console.log(__dirname)
console.log(publicDirectoryPath)

app.set("view engine", "hbs")
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
