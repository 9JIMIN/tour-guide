const Tour = require("../models/tourModel");

exports.getAllTours = async (req, res, next) => {
  const tours = await Tour.find();

  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.createTour = async (req, res, next) => {
  try {
    req.body.guides = req.user.id;
    req.user.role = "guide";
    await req.user.save({ validateBeforeSave: false });
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: "success",
      data: newTour,
    });
  } catch (err) {
    return next(new Error(err));
  }
};
