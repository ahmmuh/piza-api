const mongoose = require("mongoose");

const receptSchema = mongoose.Schema(
  {
    pizzaName: String,
    author: String,
    description: String,
    duration: String,
    socker: String,
    salt: String,
    olja: String,
    vatten: String,
  },
  {
    timestamps: true,
  }
);

const Recept = mongoose.model("Recept", receptSchema);

module.exports = Recept;
