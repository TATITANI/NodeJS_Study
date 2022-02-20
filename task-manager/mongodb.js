// MongoDB 실행 :  /Users/cheev/Documents/mongodb/bin/mongod.exe --dbpath=/Users/cheev/Documents/mongodb-data

// todo :  CRUD 구현

const {MongoClient, ObjectID, ObjectId} = require('mongodb')

const connectionURL = "mongodb://127.0.0.1"
const databaseName = "task-manager"

const id = new ObjectID()

// console.log(id)
// console.log(id.id) // binary 변환:  ObjectID 크기를 줄일수 있음
// console.log(id.id.length) // 12 
// console.log(id.toHexString().length) // 24 : ObjectID 형태의 id를 24바이트의 hex 문자열로 변환
// console.log(id.getTimestamp()) // id 생성시간

 
// 단위 : database - collection(table) - document(tuple)
MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log("Unable to connect to database!")
  }

  const db = client.db(databaseName)


 const updatePromise = db.collection("users").updateOne(
   { _id: new ObjectId("6211253763e782534f11dcb6") },
   {
     // 제한자
     // $set : 오직 하나의 필드만 변경하고 나머지 값은 유지
     $set: {
       name: "wowow2",
     },
     // 더하기
     $inc: {
       age : 10
     }
   }
 )

 updatePromise.then( (result) => {
   console.log(result)
 }).catch( (err)=>{
   console.log(err)
 })
 

  // db.collection("users").findOne({ _id : new  ObjectId("6211253763e782534f11dcb6") }, (error, user) => {
  //   if(error){
  //     console.log('Unable to fetch')
  //   }
  //   console.log(user)
  // })
  
  // const cursor = db.collection('users').find() //  커서(Cursor)는 일련의 데이터에 순차적으로 액세스할 때 검색 및 "현재 위치"를 포함하는 데이터 요소이다
  // cursor.forEach(d => console.log(d.name)) 
  // db.collection('users').find().toArray((error, users) => {
  //   console.log(users)
  // })


  // db.collection(`users`).insertMany(
  //   [
  //     {
  //       name: "woong",
  //       age: 27,
  //     },
  //     {
  //       name: "hi",
  //       age: 33,
  //     },
  //   ],
  //   (error, result) => {
  //     if (error) {
  //       return console.log(`Unable to insert user`)
  //     }
  //     console.log(result)
  //   }
  // ) 

  })