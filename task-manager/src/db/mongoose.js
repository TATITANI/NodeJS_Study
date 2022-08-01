const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/task-manager", {
  useNewUrlParser: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.log(err);
})





// MongoDB 실행 : D:/mongodb/bin/mongod.exe --dbpath=D:/mongodb-data
// 실행 명령어 : node src/db/mongoose.js




