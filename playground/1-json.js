const fs = require("fs");

const book = {
  title: "untitle",
  author: "woong",
};

const bookJson = JSON.stringify(book);
fs.writeFileSync("1-json.json", bookJson);

const parsedData = JSON.parse(bookJson);
console.log(parsedData.title);

const databuffer = fs.readFileSync("1-json.json");
const dataJson = databuffer.toString();
const user = JSON.parse(dataJson);
user.name = "chan woong";
user.age = 27;

const strData = JSON.stringify(user);
console.log(strData);
