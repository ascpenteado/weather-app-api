const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const axios = require("axios");

const PORT = process.env.PORT || 5000;
const APIKEY = process.env.APIKEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast/daily?";

app.use(cors());
app.use(express.json());

// Get city by name
app.get("/city/:cityName", async (req, res) => {
  const cityName = encodeURI(req.params.cityName);
  try {
    const response = await axios.get(`${BASE_URL}q=${cityName}&appid=${APIKEY}&units=metric`);
    const data = response.data;
    res.send(data);
  } catch (error) {
    res.send(error).status(404);
  }
});

// Get city by GeoLocation Coordinates
app.get("/coord/:lat/:lon", async (req, res) => {
  const { lat, lon } = req.params;
  try {
    const response = await axios.get(`${BASE_URL}lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric`);
    const data = response.data;
    res.send(data);
  } catch (error) {
    res.send(error).status(404);
  }
});

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});
