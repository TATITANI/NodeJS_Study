// import dd  from '../js/utils/stringModule.js'

const weatherForm = document.querySelector("form")
const search = document.querySelector("input")

const messageWeather = document.getElementById("msg-weather")
const messageInfo = document.getElementById("msg-info")
messageWeather.textContent = ""
messageInfo.textContent = "Using NodeJS"
const results = document.getElementById('result');
var xhr = new XMLHttpRequest()

mapboxgl.accessToken = "pk.eyJ1IjoiY2hlZXZlcjExNiIsImEiOiJja3lrZ3BwbzIxbGo5Mm5uODM5djNxc3F6In0.Za4fsE-_dSoHlMqIeWlt_Q"
const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  types: "country,region,place,postcode,locality,neighborhood",
})

geocoder.addTo("#geocoder")


// Add geocoder result to container.
geocoder.on("result", (e) => {

  const coordinates = e.result.geometry.coordinates
  const long = coordinates[0]
  const lat = coordinates[1]

  const address = document.getElementById("geocoder").getElementsByClassName('mapboxgl-ctrl-geocoder--input')[0].value
  const data = {
    address : address,
    lat : lat,
    long : long
  }
  xhr.open("POST", "http://localhost:3000/")
  xhr.setRequestHeader("Content-type", "application/json") // 콘텐츠 타입을 json으로
  // 'application/x-www-form-urlencoded' : &으로 분리되고, "=" 기호로 값과 키를 연결하는 key-value tuple로 인코딩되는 값
  xhr.send(JSON.stringify(data)) // 데이터 전송
  messageWeather.textContent = `loading...`

  // 응답이 왔을 때 콜백 실행
  xhr.addEventListener("load", function () {
    const weatherData = JSON.parse(xhr.responseText)
    console.log('receive weatherData ', weatherData)

    messageWeather.textContent = `위치 : ${weatherData.address} / 온도 : ${weatherData.temperature}도`
  })

})


// Clear results container when search is cleared.
geocoder.on("clear", () => {
  messageWeather.textContent.innerText = 'loading';
})
