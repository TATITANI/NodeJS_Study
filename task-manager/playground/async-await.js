// promise를 쉽게 사용
// node playground/async-await.js

const add = (a,b)=>{
    return new Promise( (resolve, reject)=>{
        setTimeout(() => {
            if(a<0 || b < 0){
                return reject('add Error')
            }
            resolve(a+b)
        }, 2000);
    })
}

// add(1,99).then( (sum) =>{
//     console.log(sum)
//     return add(sum,30)}
// ).then( (sum2) =>{
//     console.log(sum2)
// }).catch((e)=>{
//      console.log(e)
// })

const doWork = async() =>{
    const sum = await add(1,99)
    const sum2 = await add(sum,30)
    const sum3 = await add(sum2,50)
    return sum3
    // throw new Error('working error')
}

doWork().then((result)=>{
    console.log(`result ${result}`);
}).catch((e)=>{
    console.log('e', e)
})