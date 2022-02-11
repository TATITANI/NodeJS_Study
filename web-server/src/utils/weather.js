// const request = require("request")
// const stringModule = require("./stringModule")

const request = require("request")
const stringModule = require("./stringModule")

const RequestWeather = (address, lat, long) => {
  return new Promise((resolve, reject) => {
    const weatherURL =
      "http://api.weatherstack.com/current?access_key=6228ba0dbd289b5b20d8355c5c1b8d1d&query=" + lat + "," + long

    request(weatherURL, (error, response, body) => {
      if (error) {
        reject("weather connect failed")
      } else if (body.error) {
        reject("unable to find weather")
      } else {
        const data = JSON.parse(body)
        resolve(data.current.temperature)
        console.log("{0}의 현재 온도 : {1} 도".format(address, data.current.temperature))
      }
    })
  })
}

function GetWeather(address, lat, long) {
  // NOTE: 화살표 함수 대괄호를 적지 않으면 return처리됨.
  // 대괄호치면 return func~로 작성.
  return new Promise((resolve, reject) => {
    RequestWeather(address, lat, long)
      .then((temperature) => {
        resolve({
          title: "Weather",
          address: address,
          name: "woong",
          temperature: temperature,
        })
      })
      .catch((err) => {
        reject({
          error: err,
        })
      })
  })
}

module.exports = { GetWeather }
