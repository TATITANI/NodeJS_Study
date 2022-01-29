const funcA = (a,b,{c,d}) =>{

    console.log(a,b,c,d)
}

const A = {
    b : 9, 
    c : 4, 
    d : 5, 
    e : 6
}


funcA(3,2,A) // 정의보다 작은 수의 인수를 전달해도 실행됨
