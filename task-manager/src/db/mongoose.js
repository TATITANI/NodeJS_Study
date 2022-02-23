const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/task-manager-api', {
    // useNewUrlParser : true,
    // useCreateIndex : true
});

const Cat = mongoose.model("User", {
  name: {
        type : String
  },age :{
      Type : Number
  }
})

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));

