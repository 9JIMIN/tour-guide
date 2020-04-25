const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: "Tour",
  },
  price: Number,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  paid: {
    type: Boolean,
    default: true,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
