const mongoose = require('mongoose');
const validator = require('validator')
const bCrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userScehema = new mongoose.Schema({
    name: {
        type: String,
        // 중복 방지, 중복되면 save에러 
        unique: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('age must be a positive number')
            }
        }
    },
    email: {
        type: String,
        required: [true, "메일 입력하세요"],
        unique: true,
        trim : true,
        lowercase : true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is Invalid')
            }
        }
    },
    password: {
        type: String,
        required: [true, '비번 없음'],
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password" ')
            }
        }
    },
    tokens: [{
        token: {
            type : String,
            required : true
        }
    }]
})

userScehema.statics.findByCredentfials = async (email, password)=>{
    const user = await User.findOne({email})
    if(!user){
        throw new Error('Unable to login')
    }
    const isMatch = await bCrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error('Unable to login')
    }

    return user
} 

// NOTE : statics는 모델에서 접근가능하고, methods는 인스턴스에서 접근가능하다.
userScehema.methods.generateAutoToken = async function (){
    const user = this
    const token = jwt.sign({"_id" : user._id.toString()}, "thisismynewcourse")

    user.tokens = user.tokens.concat({token})
    await user.save()


    return token
    
}

// hash the password
userScehema.pre('save', async function (next)  {
    const user = this
    if(user.isModified('password')){
        user.password = await bCrypt.hash(user.password, 8)
    }
    next()
})


// 첫번째 파라미터 : 콜렉션 이름
const User = mongoose.model('user', userScehema)

module.exports = User


