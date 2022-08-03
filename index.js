const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

// oegULH9U0a5v1IgF;

app.get(
  `/https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}`,
  (req, res) => {
    console.log("route/comics");
    res.status(200).json({ message: "route /" });
  }
);
app.get(
  `/https://lereacteur-marvel-api.herokuapp.com/comics/5fc8ba1fdc33470f788f88b3?apiKey=${process.env.API_KEY}`,
  (req, res) => {
    console.log("route/comicswithID");
    res.status(200).json({ message: "route /" });
  }
);
app.get(
  `/https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}`,
  (req, res) => {
    console.log("route/characters");
    res.status(200).json({ message: "route /" });
  }
);
app.get(
  `/https://lereacteur-marvel-api.herokuapp.com/character/5fcf91f4d8a2480017b91453?apiKey=${process.env.API_KEY}`,
  (req, res) => {
    console.log("route/characterswithID");
    res.status(200).json({ message: "route /" });
  }
);

const userRoutes = require("./routes/user");
app.use(userRoutes);

app.all("*", (req, res) => {
  console.log("route not found");
  res.status(404).json({ message: "route not found" });
});

app.listen(process.env.PORT, () => {
  console.log("server ON!");
});
