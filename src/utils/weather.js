const request = require("postman-request");

const apiKey = "6406d37356bf49198d2170334211210";

const getWeather = (latitude, longitude, callback) => {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}&aqi=yes`;

    request({ url, json: true }, (err, response) => {
        if (err) {
            callback("Unable to make the request.");
        } else if (response.body.error) {
            callback("Invalid parameters.");
        } else {
            callback(undefined, {
                tempC: response.body.current.temp_c,
                feelsLikeC: response.body.current.feelslike_c,
            });
        }
    });
};

module.exports = {
    getWeather,
};
