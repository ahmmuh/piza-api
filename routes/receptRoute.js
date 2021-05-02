const express = require("express");
const Recept = require("../models/Recept");
const app = express.Router();

const cors = require("cors");
app.use(cors());

app.get("/", async (req, res) => {
  try {
    const recept = await Recept.find();
    res.json(recept);
  } catch (err) {
    res.json({ message: err });
  }
});

app.post("/add", async (req, res) => {
  const recept = new Recept({
    pizzaName: req.body.pizzaName,
    author: req.body.author,
    description: req.body.description,
    duration: req.body.duration,
    socker: req.body.socker,
    salt: req.body.salt,
    olja: req.body.olja,
    vatten: req.body.vatten,
  });
  try {
    const savedRecept = await recept.save();
    res.json(savedRecept);
  } catch (err) {
    res.json({ message: err });
  }
});

app.get("/:receptId", async (req, res) => {
  try {
    const recept = await Recept.findById(req.params.receptId);
    res.json(recept);
  } catch (error) {
    res.json({ message: error });
  }
});

app.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const recept = await Recept.remove({ _id: id });
    res.json(recept);
  } catch (error) {
    res.json({ message: error });
  }
});

app.put("/:receptId", async (req, res) => {
  try {
    const updateRecept = await Recept.updateOne(
      { _id: req.params.receptId },
      {
        $set: { name: req.body.name },
      }
    );
    res.json(updateRecept);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = app;
