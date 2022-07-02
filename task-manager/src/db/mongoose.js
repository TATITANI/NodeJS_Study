const mongoose = require('mongoose');


// mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  

mongoose.connect("mongodb://127.0.0.1:27017/task-manager", {
  useNewUrlParser: true,
  //deprecated
  // useCreateIndex: true, 
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.log(err);
});


const User = mongoose.model('woong',{
  name : {
    type : String
  },
  age : {
    type : Number
  }
})

const me  = new User({
  name : 'tatddi',
  age : 500
})


me.save().then( () => {
  console.log(me)
}).catch((err)=>{
  console.log('Save Error : ', err)
})

// node src/db/mongoose.js