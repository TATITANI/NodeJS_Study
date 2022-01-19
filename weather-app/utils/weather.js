const request = require("request");
const stringModule = require("./stringModule");

const weather = (location, lat, long) => {
  const weatherURL =
    "http://api.weatherstack.com/current?access_key=6228ba0dbd289b5b20d8355c5c1b8d1d&query=" +
    lat +
    "," +
    long;

  request(weatherURL, (error, response, body) => {
    if (error) {
      console.log("weather connect failed");
    } else if (body.error) {
      console.log("unable to find weather");
    } else {
      const data = JSON.parse(body);
      console.log(
        "{0}의 현재 온도 : {1} 도".format(location, data.current.temperature)
      );
    }
  });
};

module.exports = weather;
