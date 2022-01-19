const request = require("request");
const stringModule = require("./stringModule");

const weather = (lat, long, callback) => {
  const weatherURL =
    "http://api.weatherstack.com/current?access_key=6228ba0dbd289b5b20d8355c5c1b8d1d&query=" +
    lat +
    "," +
    long;

  request(weatherURL, (error, response, body) => {
    if (error) {
      callback("weather connect failed", undefined);
    } else if (body.error) {
      callback("unable to find weather", undefined);
    } else {
      const data = JSON.parse(body);
      callback(
        undefined,
        "현재 온도 : {0} 도".format(data.current.temperature)
      );
    }
  });
};

module.exports = weather;
