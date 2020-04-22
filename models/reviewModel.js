const mongoose = require("mongoose");
const Tour = require("./tourModel");
const User = require("./userModel");

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

reviewSchema.statics.calcAverageRatings = async function (tourId) {
  const stats = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: "$tour",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  if (stats.length > 0) {
    const guideId = (await Tour.findById(tourId)).guides[0].id;
    await User.findByIdAndUpdate(guideId, {
      ratingsAverage: stats[0].avgRating,
    });
    await User.findByIdAndUpdate(guideId, {
      ratingsQuantity: stats[0].nRating,
    });
  } else {
    (await Tour.findById(tourId)).guides[0].ratingsAverage = 0;
    (await Tour.findById(tourId)).guides[0].ratingsQuantity = 0;
  }
};

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name",
  });
  next();
});

reviewSchema.post("save", function () {
  this.constructor.calcAverageRatings(this.tour);
});

reviewSchema.post(/^find/, async function (doc) {
  await doc.constructor.calcAverageRatings(doc.tour);
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
