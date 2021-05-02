const mongoose = require("mongoose");

const useSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const Auth = mongoose.model("Auth", useSchema);

module.exports = Auth;
