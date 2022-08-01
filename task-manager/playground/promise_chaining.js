require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('62e7b3b5d0c0eba897622a3d', { age: 1 }).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 1 })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

// async로 위 코드를 이렇게 단순하게 표현
const updateAgeAndCount = async(id, age) =>{
    const user = await User.findByIdAndUpdate(id, {age})
    const count = await User.countDocuments({age})
    return count
}

updateAgeAndCount('62e7b3b5d0c0eba897622a3d', 2).then((count)=>{
    console.log(count)
}).catch( (e)=>{
    console.log(e)
})