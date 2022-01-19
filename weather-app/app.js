const request = require("request");
const geoCode = require("./utils/geocode");

geoCode("korea", (error, data) => {
  console.log("Error", error);
  console.log("Data", data);
});
