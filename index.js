const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

axios
  .get(
    `/https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}`
  )
  .then((response) => {
    // console.log(response.data); // Affichera la réponse du serveur
  })
  .catch((error) => {
    console.log(error); // Affichera d'éventuelles erreurs, notamment en cas de problème de connexion Internet.
  });

axios
  .get(
    `https://lereacteur-marvel-api.herokuapp.com/comics/5fc8ba1fdc33470f788f88b3?apiKey=${process.env.API_KEY}`
  )
  .then((response) => {
    // console.log(response.data); // Affichera la réponse du serveur
  })
  .catch((error) => {
    console.log(error); // Affichera d'éventuelles erreurs, notamment en cas de problème de connexion Internet.
  });
axios
  .get(
    `/ https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}`
  )
  .then((response) => {
    // console.log(response.data); // Affichera la réponse du serveur
  })
  .catch((error) => {
    console.log(error); // Affichera d'éventuelles erreurs, notamment en cas de problème de connexion Internet.
  });
axios
  .get(
    `https://lereacteur-marvel-api.herokuapp.com/character/5fcf91f4d8a2480017b91453?apiKey=${process.env.API_KEY}`
  )
  .then((response) => {
    // console.log(response.data); // Affichera la réponse du serveur
  })
  .catch((error) => {
    console.log(error); // Affichera d'éventuelles erreurs, notamment en cas de problème de connexion Internet.
  });

const userRoutes = require("./routes/user");
app.use(userRoutes);

app.all("*", (req, res) => {
  console.log("route not found");
  res.status(404).json({ message: "route not found" });
});

app.listen(process.env.PORT, () => {
  console.log("server ON!");
});
