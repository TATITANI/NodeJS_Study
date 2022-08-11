const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.log(err);
})





// MongoDB 실행 : D:/mongodb/bin/mongod.exe --dbpath=D:/mongodb-data
// 실행 명령어 : node src/db/mongoose.js




