const calculateMultiply = (a, b) => a*b                                  


const add = (a,b)=>{
    return new Promise( (resolve, reject)=>{
        setTimeout(() => {
            if(a<0 || b < 0){
                return reject('add Error')
            }
            resolve(a+b)
        }, 1000);
    })
}

module.exports = {
    calculateMultiply,
    add
}