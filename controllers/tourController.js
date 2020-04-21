const Tour = require("../models/tourModel");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllTours = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Tour.find(), req.query);
  const doc = await features.query;
  res.locals.tours = doc;
  next();
});

exports.createTour = catchAsync(async (req, res, next) => {
  req.body.guides = req.user.id;
  const newTour = await Tour.create(req.body);

  req.user.role = "guide";
  req.user.tour.push(newTour.id);
  await req.user.save({ validateBeforeSave: false });

  res.status(201).json({
    status: "success",
    data: newTour,
  });
});
