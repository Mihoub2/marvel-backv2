const express = require("express");
const cors = require("cors");
// const mongoose = require("mongoose");
require("dotenv").config();
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

// oegULH9U0a5v1IgF

// mongoose.connect(process.env.MONGODB_URI);
app.get("/", (req, res) => {
  console.log("route /");
  res.status(200).json({ message: "route /" });
});
app.get("/comics", (req, res) => {
  try {
    axios
      .get(
        `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}`
      )
      .then((response) => {
        const comics = response.data.results;

        res.json(comics);
      });
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/comics", (req, res) => {
  try {
    axios
      .get(
        `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}`
      )
      .then((response) => {
        const comics = response.data.results;

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
        `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}`
      )
      .then((response) => {
        const characters = response.data.results;

        res.json(characters);
      });
  } catch (error) {
    console.log(error.message);
  }
});
// app.get("/comics/Id", (req, res) => {
//   try {
//     axios
//       .get(
//         `https://lereacteur-marvel-api.herokuapp.com/comics/5fc8ba1fdc33470f788f88b3?apiKey=${process.env.API_KEY}`
//       )
//       .then((response) => {
//         const comicsById = response.data;
//         res.json(comicsById);
//       });
//   } catch (error) {
//     console.log(error.message);
//   }
// });
// app.get("/comics/characterId", (req, res) => {
//   try {
//     axios
//       .get(
//         `https://lereacteur-marvel-api.herokuapp.com/character/5fcf91f4d8a2480017b91453?apiKey=${process.env.API_KEY}`
//       )
//       .then((response) => {
//         const charactersById = response.data.result;

//         res.json(charactersById);
//       });
//   } catch (error) {
//     console.log(error.message);
//   }
// });

// const userRoutes = require("./routes/user");
// app.use(userRoutes);

app.all("*", (req, res) => {
  console.log("route not found");
  res.status(404).json({ message: "route not found" });
});

app.listen(process.env.PORT, () => {
  console.log("server ON!");
});
