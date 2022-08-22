const request = require('supertest')
const app = require('../src/app')

test('Should signup a new user', async() =>{
    await request(app).post('/user').send({
        name: 'tati2',
        email : 'tmail2@a.com',
        password : "red12345!"
    }).expect(201)
})