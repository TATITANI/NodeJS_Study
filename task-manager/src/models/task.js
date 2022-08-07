const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  owner :{
    type : mongoose.Schema.Types.ObjectId,
    required: true,
    ref : 'user' // 참조할 몽구스 모델(컬렉션)명 
  }
},{
  timestamps : true
})

const Task = mongoose.model('Task', taskSchema )

module.exports =  Task