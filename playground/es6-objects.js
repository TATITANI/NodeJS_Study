const user = {
  name: `woong`,
  age: 15,
  location: "korea",
  hobby: undefined,
};

const A = ({ name: name2, age } = user);
A.name = 'bb'
console.log(user.name);
console.log(name2);
console.log(age);
console.log(A.name);


arr1 = [1,2,3]
//spread 연산자 : 대상 배열 또는 이터러블(iterable)을 "개별" 요소로 분리
arr2 = [...arr1] // 값만 복사
arr2[0] = 5
console.log(arr1)
console.log(arr2)

//rest 파라미터 : 파라미터로 오는 값들을 "배열"로 전달
func = (...a) => {
  console.log(a[1])
}

func(4,5,6)