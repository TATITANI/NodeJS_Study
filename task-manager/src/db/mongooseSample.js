const mongoose = require('mongoose');
const validator = require('validator')

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
    unique : true
  },
  age : {
    type : Number,
    validate(value){
      if(value < 0){
        throw new Error('age must be a positive number')
      }
    }
  },
  email : {
     type : String,
     required : [true, "메일 입력하세요"],
     validate(value){
      if(!validator.isEmail(value)){
          throw new Error('Email is Invalid')
      }
     }
  }
// validation 종류
// required: 필수 입력
// unique: 다른 행과 중복되면 안됨.
// trim: 공백 제거(문자열 타입에 사용)
// default: 문서가 생성되면 기본값으로 저장된다.
// lowercase: 대문자를 소문자로 저장
// match: 정규식으로 저장하려는 값과 비교
// validate: 함수로 개발자가 조건을 만듦.
// set: 값을 입력할 때 함수로 조건을 만듦.
// get: 값을 출력할 때 함수로 조건을 만듦.
// ref: 해당하는 모델을 참조할 때 사용.
})

const me  = new User({
  name : 'tani3',
  age : 2,
  email : "123@gmial.com"
})


me.save().then( () => {
  console.log(me)
}).catch((err)=>{
  console.log('Save Error : ', err)
})
 

// 실행 명령어 : node src/db/mongooseSample.js




