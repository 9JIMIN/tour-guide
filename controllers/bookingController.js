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
