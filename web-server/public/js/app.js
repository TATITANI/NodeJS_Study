console.log("Client side javascript file is loaded!")

const weatherForm = document.querySelector("form")
const search = document.querySelector("input")

const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')
messageOne.textContent = 'From Javascript'


weatherForm.addEventListener("submit", (e) => {
  e.preventDefault() // 기본 이벤트 실행방지

  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''

  const address = search.value
  fetch("http://localhost:3000/weather?address=" +  address).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {

        messageOne.textContent = data.address
        messageTwo.textContent = "현재 온도: " + data.temperature
      }
    })
  })
})
