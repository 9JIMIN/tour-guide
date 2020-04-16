const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: String,
  duration: Number,
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
