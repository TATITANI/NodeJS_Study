const request = require("request");
const stringModule = require("./stringModule");

const geoCode = (address, weather) => {
  const geoCodeURL =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?types=country&access_token=pk.eyJ1IjoiY2hlZXZlcjExNiIsImEiOiJja3lrZ3BwbzIxbGo5Mm5uODM5djNxc3F6In0.Za4fsE-_dSoHlMqIeWlt_Q";

  request({ url: geoCodeURL, json: true }, (error, { body }) => {
    if (error) {
      console.log("weather connect failed");
    } else if (body.features.length == 0) {
      console.log("unable to find weather");
    } else {
      longitude = body.features[0].center[0];
      latitude = body.features[0].center[1];
      location = body.features[0].place_name;
      weather(location, latitude, longitude);
    }
  });
};

module.exports = geoCode;
