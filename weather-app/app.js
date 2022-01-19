const request = require("request");
const geoCode = require("./utils/geocode");
const weather = require("./utils/weather");

const address = process.argv[2]; // korea

if (!address) {
  console.log("adress missing");
} else {
  geoCode(address, weather);
}
