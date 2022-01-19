const stringModule = require("./stringModule");
const request = require("request");

const url =
  "http://api.weatherstack.com/current?access_key=6228ba0dbd289b5b20d8355c5c1b8d1d&query=33.348885,126.280975";

request(url, (error, response, body) => {
  if (error) {
    console.log("weather connect failed");
  } else if (body.error) {
    console.log("unable to find weather");
  } else {
    const data = JSON.parse(body);
    console.log("현재 온도 : {0} 도".format(data.current.temperature));
  }
});

const geoCodeURL =
  "https://api.mapbox.com/geocoding/v5/mapbox.places/georgia.json?types=country&access_token=pk.eyJ1IjoiY2hlZXZlcjExNiIsImEiOiJja3lrZ3BwbzIxbGo5Mm5uODM5djNxc3F6In0.Za4fsE-_dSoHlMqIeWlt_Q";

request({ url: geoCodeURL, json: true }, (error, response, body) => {
  if (error) {
    console.log("weather connect failed");
  } else if (body.features.length == 0) {
    console.log("unable to find weather");
  } else {
    const longitude = body.features[0].center[0];
    const latitude = body.features[0].center[1];
    const placeName = body.features[0].place_name;

    console.log(
      "위치 : {0}, 위도 : {1}, 경도 : {2}".format(
        placeName,
        latitude,
        longitude
      )
    );
  }
});
