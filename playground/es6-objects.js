const user = {
  name: `woong`,
  age: 15,
  location: "korea",
  hobby: undefined,
};

const A = ({ name: name2, age } = user);
console.log(user.name);
console.log(name2);
console.log(age);
console.log(A.name);
