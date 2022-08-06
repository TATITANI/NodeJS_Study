const mongoose = require('mongoose')

const Task = mongoose.model('Task', {
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
    ref : 'user' // 참조할 몽구스 모델명 
  }
})

module.exports = Task