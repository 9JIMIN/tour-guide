const Review = require("../models/reviewModel");
const Tour = require("../models/tourModel");
const Booking = require("../models/bookingModel");

exports.setId = async (req, res, next) => {
  try {
    const tour = await Tour.findById(req.body.tourId);
    req.body.user = req.user.id;
    req.body.tour = req.body.tourId;
    req.body.guide = tour.guides[0].id;
    next();
  } catch (err) {
    return next(err);
  }
};

exports.createReview = async (req, res, next) => {
  try {
    const newReview = await Review.create(req.body);
    await Booking.deleteOne({ tour: req.body.tourId, user: req.user.id });

    res.status(201).json({
      status: "success",
      data: {
        newReview,
      },
    });
  } catch (err) {
    return next(err);
  }
};
