// 테스트용 소스파일은 항상 .test.js로 끝나야 한다.

const {calculateMultiply, add} = require('../src/math')

test("do multiply", () => {
    const result = calculateMultiply(2,3)

    expect(result).toBe(10)

    // if(result !== 10){
    //     throw new Error('multiply is wrong')
    // }
})

// done 파라미터를 입력해야 비동기 테스트 가능
test('Aysnc test demo', (done) => {
    
    setTimeout(() => {
        exepct(1).toBe(2)
        done()
    }, 2000);
})

test('add', (done)=>{

    add(2,3).then((sum) =>{
        expect(sum).toBe(5)
        done()
    })
})

test('add async/await', async ()=>{
    const sum = await add(1,2)
    expect(sum).toBe(3)
})