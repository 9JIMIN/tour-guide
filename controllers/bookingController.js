const catchAsync = require("../utils/catchAsync");
const Booking = require("../models/bookingModel");

exports.createBooking = catchAsync(async (req, res, next) => {
  req.body.user = req.user.id;
  const newBooking = await Booking.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      newBooking,
    },
  });
});

exports.deleteBooking = catchAsync(async (req, res, next) => {
  console.log(req.body.booking);
  await Booking.findByIdAndDelete(req.body.booking);

  res.status(200).json({
    status: "success",
    data: null,
  });
});
