const { MongoDBNamespace } = require('mongodb');
const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/task-manager", {
  useNewUrlParser: true,
  //deprecated
  // useCreateIndex: true, 
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.log(err);
});


const User = mongoose.model('task',{
  name : {
    type : String,
    // 중복 방지, 중복되면 save에러 
    //unique : true
  },
  age : {
    type : Number
  }
})

const me  = new User({
  name : 'tani',
  age : 500
})


me.save().then( () => {
  console.log(me)
}).catch((err)=>{
  console.log('Save Error : ', err)
})
 

// 실행 명령어 : node src/db/mongoose.js




