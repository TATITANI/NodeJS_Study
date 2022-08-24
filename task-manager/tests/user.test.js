const request = require('supertest')
const app = require('../src/app')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../src/models/user')


const userOneID = new mongoose.Types.ObjectId()
const userOne = {
    _id : userOneID,
    name : "tati0",
    age : 0,
    email : "tmail14@a.com",
    // password : 'red12345!',
    tokens : [{
        token :  jwt.sign({"_id" : userOneID}, process.env.JWT_SECRET)
    }]
}

// beforeAll : 전역으로 테스트 전 한번만 실행

// 테스트함수들이 실행되기 전마다 실행 
beforeEach ( async () =>{
    await User.deleteMany()
    try{
        await new User(userOne).save()
    }catch(e){
        console.log(` 에러 ${e} : ${userOne.name}`)
    }
})

test('Should signup a new user', async() =>{
    
    await request(app).post('/user').send({
        name: 'tati3',
        email : 'tmail3@a.com',
        password : 'red12345!',
    }).expect(201)
})


