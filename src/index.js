const express = require("express");
const path = require("path");
const hbs = require("hbs");
const { getGeocode } = require("./utils/geocode");
const { getWeather } = require("./utils/weather");

const app = express();
const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../view");
const partialsPath = path.join(__dirname, "../template");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDir));

app.get("/", (req, res) => {
    res.render("index", {
        title: "Home",
        name: "Bob",
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({ error: "Address is required" });
    }

    getGeocode(req.query.address, (geoErr, geo) => {
        if (geoErr) {
            return res.send({ error: geoErr });
        }

        getWeather(geo.latitute, geo.longitude, (weatherErr, weather) => {
            if (weatherErr) {
                res.send({ error: weatherErr });
            }

            res.send({ location: geo.location, temp: weather.tempC, feelsLike: weather.feelsLikeC });
        });
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "Not Found",
        error: "",
    });
});

app.listen(3000, () => console.log("Server is up at http://localhost:3000/"));
