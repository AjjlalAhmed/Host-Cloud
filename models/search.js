const mongoose = require("mongoose");

const resultModel = new mongoose.Schema({
  domainName: {
    type: String,
    required: true,
  },
  domainAvailability: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("result",resultModel);
