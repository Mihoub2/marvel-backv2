const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.LINKMONGO);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome on Mihoub's API" });
});

app.get("/comics", (req, res) => {
  try {
    axios
      .get(
        `https://lereacteur-marvel-api.herokuapp.com/comics/?apiKey=${
          process.env.API_KEY
        }&skip=${(req.query.page - 1) * 100}`
      )
      .then((response) => {
        const comics = response.data;
        console.log(response.data);

        res.json(comics);
      });
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/characters", (req, res) => {
  try {
    axios
      .get(
        `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${
          process.env.API_KEY
        }&name=${req.query.name}&skip=${(req.query.page - 1) * 100}`
      )
      .then((response) => {
        const characters = response.data;

        res.json(characters);
      });
  } catch (error) {
    console.log(error.message);
  }
});
app.get("/characters/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${req.params.id}?apiKey=${apiKey}`
    );
    res.json(response.data);
  } catch (error) {
    res.json(error.message);
  }
});

app.get("/comics/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.id}?apiKey=${apiKey}`
    );
    res.json(response.data);
  } catch (error) {
    res.json(error.message);
  }
});

const userRoutes = require("./routes/user");
app.use(userRoutes);

app.all("*", (req, res) => {
  console.log("route not found");
  res.status(404).json({ message: "route not found" });
});

app.listen(process.env.PORT, () => {
  console.log("Go!");
});
