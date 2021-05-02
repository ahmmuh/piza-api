const express = require("express");
const app = express.Router();
const cors = require("cors");
const bcrypt = require("bcrypt");
const Auth = require("../models/Auth");

app.use(cors());

app.get("/", async (req, res) => {
  try {
    const user = await Auth.find();
    res.json(user);
  } catch (error) {
    res.json({ message: error });
  }
});

app.post("/register", async (req, res) => {
  const usernameExists = await Auth.findOne({ username: req.body.username });
  if (usernameExists)
    return res.status(400).send("username already exists,create new one");

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  const user = new Auth({
    username: req.body.username,
    password: hashPassword,
  });
  try {
    const registeredUser = await user.save();
    res.json(registeredUser);
  } catch (err) {
    res.json({ message: err });
  }
});

app.post("/login", async (req, res) => {
  const user = await Auth.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("username or password is wrong");

  const validPassword = await bcrypt.compare(
    req.body.password,
    user.password,
    () => {}
  );

  if (!validPassword) {
    return res.send("Not valid password");
  }

  res.send("Success logged");
});

module.exports = app;
