const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

// oegULH9U0a5v1IgF

mongoose.connect(process.env.MONGODB_URI);

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
// app.get("/comics/characterId", (req, res) => {
//   try {
//     axios
//       .get(
//         `https://lereacteur-marvel-api.herokuapp.com/character/5fcf91f4d8a2480017b91453?apiKey=${process.env.API_KEY}`
//       )
//       .then((response) => {
//         const charactersById = response.data.comics;

//         res.json(charactersById);
//       });
//   } catch (error) {
//     console.log(error.message);
//   }
// });
// app.get("/characters", (req, res) => {
//   try {
//     axios
//       .get(
//         `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=Y${process.env.API_KEY}`
//       )
//       .then((response) => {
//         const characters = response.data.results;

//         res.json(characters);
//       });
//   } catch (error) {
//     console.log(error.message);
//   }
// });
// app.get("/comicsByID", (req, res) => {
//   try {
//     axios
//       .get(
//         `https://lereacteur-marvel-api.herokuapp.com/comics/5fc8ba1fdc33470f788f88b3?apiKey=${process.env.API_KEY}`
//       )
//       .then((response) => {
//         const comicsById = response.data.results;
//         res.json(comicsById);
//       });
//   } catch (error) {
//     console.log(error.message);
//   }
// });

const userRoutes = require("./routes/user");
app.use(userRoutes);

app.all("*", (req, res) => {
  console.log("route not found");
  res.status(404).json({ message: "route not found" });
});

app.listen(process.env.PORT, () => {
  console.log("server ON!");
});
