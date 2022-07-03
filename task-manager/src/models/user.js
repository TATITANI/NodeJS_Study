const mongoose = require('mongoose');
const validator = require('validator')


const User = mongoose.model('task', {
    name: {
        type: String,
        // 중복 방지, 중복되면 save에러 
        unique: true
    },
    age: {
        type: Number,
        default : 0,
        validate(value) {
            if (value < 0) {
                throw new Error('age must be a positive number')
            }
        }
    },
    email: {
        type: String,
        required: [true, "메일 입력하세요"],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is Invalid')
            }
        }
    },
    password : {
        type : String,
        required : [true, '비번 없음'],
        minlength : 7,
        trim : true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain "password" ')
            }
        }
    }

})

module.exports = User


