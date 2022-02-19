// MongoDB 실행 :  /Users/cheev/Documents/mongodb/bin/mongod.exe --dbpath=/Users/cheev/Documents/mongodb-data

// todo :  CRUD 구현

const {MongoClient, ObjectID} = require('mongodb')

const connectionURL = "mongodb://127.0.0.1"
const databaseName = "task-manager"

const id = new ObjectID()
console.log(id)
console.log(id.id) // binary 변환:  ObjectID 크기를 줄일수 있음
console.log(id.id.length) // 12 
console.log(id.toHexString().length) // 24 : ObjectID 형태의 id를 24바이트의 hex 문자열로 변환
console.log(id.getTimestamp()) // 24 

 
// 단위 : database - collection(table) - document(tuple)
MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log("Unable to connect to database!")
  }

  const db = client.db(databaseName)

  db.collection(`users`).insertMany(
    [
      {
        name: "woong",
        age: 27,
      },
      {
        name: "hi",
        age: 33,
      },
    ],
    (error, result) => {
      if (error) {
        return console.log(`Unable to insert user`)
      }
      console.log(result)
    }
  ) 
})
