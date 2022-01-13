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

t.print(); //
t.printByAF(); // 바인딩이 printbyAF로 돼서 에러
