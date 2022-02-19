// MongoDB 실행 :  /Users/cheev/Documents/mongodb/bin/mongod.exe --dbpath=/Users/cheev/Documents/mongodb-data

// CRUD 구현

const mongodb = require("mongodb")
const mongoClient = mongodb.MongoClient

const connectionURL = "mongodb://127.0.0.1"
const databaseName = "task-manager"

// 단위 : database - collection(table) - document(tuple)
mongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
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
