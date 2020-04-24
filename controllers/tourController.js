const { unlinkSync } = require("fs");
const multer = require("multer");
const sharp = require("sharp");
const Tour = require("../models/tourModel");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Please upload image!", 400), false);
  }
};
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadTourImages = upload.fields([
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 3 },
]);

exports.resizeTourImages = catchAsync(async (req, res, next) => {
  const { tour } = req.app.locals;

  if (req.files.imageCover) {
    if (tour && tour.imageCover)
      unlinkSync(`public/img/tours/${tour.imageCover}`);

    req.body.imageCover = `tour-${req.user.id}-${Date.now()}-cover.jpeg`;
    await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`public/img/tours/${req.body.imageCover}`);
  }

  if (req.files.images) {
    if (tour && tour.images) {
      for (let i = 0; i < tour.images.length; i++) {
        unlinkSync(`public/img/tours/${tour.images[i]}`);
      }
    }
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (file, i) => {
        const filename = `tour-${req.user.id}-${Date.now()}-${i + 1}.jpeg`;
        await sharp(file.buffer)
          .resize(2000, 1333)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`public/img/tours/${filename}`);

        req.body.images.push(filename);
      })
    );
  }

  next();
});

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
  await req.user.save({ validateBeforeSave: false });

  res.status(201).json({
    status: "success",
    data: newTour,
  });
});

exports.updateTour = catchAsync(async (req, res, next) => {
  const { tour } = req.app.locals;
  if (req.body.imageCover === "undefined") {
    req.body.imageCover = tour.imageCover;
  }

  if (!req.body.images) {
    req.body.images = tour.images;
  }
  const updatedTour = await Tour.findByIdAndUpdate(
    req.app.locals.tour.id,
    req.body,
    {
      runValidators: true,
      new: true,
    }
  );

  req.app.locals.tour = undefined;

  res.status(200).json({
    status: "success",
    data: updatedTour,
  });
});
