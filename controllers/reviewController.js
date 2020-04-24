const Review = require("../models/reviewModel");

exports.setTourUserId = async (req, res, next) => {
  req.body.tour = req.app.locals.tourId;
  req.body.user = req.user.id;

  req.app.locals.tourId = undefined;
  next();
};

exports.createReview = async (req, res, next) => {
  try {
    const newReview = await Review.create(req.body);

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
