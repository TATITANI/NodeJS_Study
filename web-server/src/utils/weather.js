const request = require("request")
const stringModule = require("./stringModule")

const weather = ([location, lat, long]) => {
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
        // resolve("{0}의 현재 온도 : {1} 도".format(location, data.current.temperature))
      }
    })
  })
}


module.exports = weather
