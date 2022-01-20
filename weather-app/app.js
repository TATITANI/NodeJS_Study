const request = require("request");
const geoCode = require("./utils/geocode");
const weather = require("./utils/weather");

const address = process.argv[2]; // korea

if (!address) {
  console.log("adress missing");
} else {
  geoCode(address, weather);
}

// 번외 :  라이브러리 없이 request
// const https = require("https");
// const geoCodeURL =
//   "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
//   encodeURIComponent("korea") +
//   ".json?types=country&access_token=pk.eyJ1IjoiY2hlZXZlcjExNiIsImEiOiJja3lrZ3BwbzIxbGo5Mm5uODM5djNxc3F6In0.Za4fsE-_dSoHlMqIeWlt_Q";

// const request2 = https.request(geoCodeURL, (Response) => {
//   let data = "";
//   Response.on("data", (chunk) => {
//     data = data + chunk.toString();
//   });

//   Response.on("end", () => {
//     const body = JSON.parse(data);
//     console.log(body);
//   });
// });

// request2.on("error", (error) => {
//   console.log("error : ", error);
// });

// request2.end();
