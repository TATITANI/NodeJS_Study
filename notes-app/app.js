var fs = require("fs"); // 모듈 불러옴

// fs.writeFileSync("notes.txt", `This file was created by NodeJS`);
// fs.appendFileSync(`notes.txt`, `추가 내용222'`);

const add = require("./util.js");
const sum = add(1, 3);
console.log(sum);
