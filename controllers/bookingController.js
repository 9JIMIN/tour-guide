const stripe = require("stripe")("sk_test_QAvKXqZpGWHeuuJvDCAWWg8w00zGTpKVE2");
const catchAsync = require("../utils/catchAsync");
const Booking = require("../models/bookingModel");
const Tour = require("../models/tourModel");

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.tourId);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        name: `${tour.name}`,
        description: tour.description,
        images: [
          `${req.protocol}://${req.get("host")}/img/tours/${tour.imageCover}`,
        ],
        amount: tour.price * 100,
        currency: "usd",
        quantity: 1,
      },
    ],
    success_url: `${req.protocol}://${req.get("host")}/${req.params.userName}`,
    cancel_url: `${req.protocol}://${req.get("host")}/${req.params.userName}/${
      tour.slug
    }`,
  });

  res.status(200).json({
    status: "success",
    session,
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
