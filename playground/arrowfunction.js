// 객체 리터럴
const Test = {
  name: "woong",
  Test() {},
  printByAF: () => {
    console.log(this.name);
  },
  print() {
    console.log(this.name);
  },
};

Test.print()
Test.printByAF(); // 바인딩이 printbyAF로 돼서 에러
