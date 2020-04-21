const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  rating: { type: Number, required: [true, "rating missing"], min: 1, max: 5 },
  review: {
    type: String,
    required: [true, "please type review content!"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: "Tour",
  },
});

//reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name",
  });
  next();
});
const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
