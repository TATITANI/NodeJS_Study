console.log("Client side javascript file is loaded!")

const weatherForm = document.querySelector("form")
const search = document.querySelector("input")

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault() // 기본 이벤트 실행방지

  const address = search.value
  fetch("http://localhost:3000/weather?address=" +  address).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        console.log(data.address)
        console.log(data.forecast)
        console.log("온도 : ", data.temperature)
      }
    })
  })
})
