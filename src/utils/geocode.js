const request = require("postman-request");

const apiKey = "pk.eyJ1IjoiaGlwaXNsdDAwNyIsImEiOiJja3VvZGp5MTYwdDhsMm9vYTJjODJ3cnB3In0.d5soYCcRioHByC291OADNA";

const getGeocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${apiKey}&limit=1`;

    request({ url, json: true }, (err, response) => {
        if (err) {
            callback("Unable to make the request.");
        } else if (response.body.features.length === 0) {
            callback("Invalid parameters.");
        } else {
            const latitute = response.body.features[0].center[1];
            const longitude = response.body.features[0].center[0];
            const location = response.body.features[0].place_name;

            callback(undefined, { latitute, longitude, location });
        }
    });
};

module.exports = {
    getGeocode,
};
