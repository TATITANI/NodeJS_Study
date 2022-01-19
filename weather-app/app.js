const request = require("request");
const geoCode = require("./utils/geocode");
const weather = require("./utils/weather");

function PrintResult(error, data) {
  console.log("Error", error);
  console.log("Data", data);
}

geoCode("korea", PrintResult);

weather(33.348885, 126.280975, PrintResult);
