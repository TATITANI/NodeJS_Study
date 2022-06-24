// var fs = require("fs"); // 모듈 불러옴

// const filePath = "notes-app/notes.txt";
// fs.writeFileSync(filePath, `This file was created by NodeJS`);
// fs.appendFileSync(filePath, `추가 내용222'`);

const add = require("./src/notes.js");
// const add = import("./notes.js");
const sum = add(1, 3);
console.log(sum);

const validator = require("validator");
//import validator from "validator"; // Note : NodeJS는 commmonJS 기반이라 import, export 키워드 사용 불가
console.log(validator.isEmail("woong@g.com"));

const chalk = require("chalk");
const greenMsg = chalk.green.inverse.bold("green txt");
console.log(greenMsg);

console.log(process.argv[2]);
