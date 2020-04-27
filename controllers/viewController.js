const Tour = require("../models/tourModel");
const Booking = require("../models/bookingModel");

exports.getOverview = async (req, res, next) => {
  res.status(200).render("overview");
};

exports.getSignupForm = (req, res, next) => {
  res.status(200).render("signupForm");
};

exports.getLoginForm = (req, res, next) => {
  res.status(200).render("login");
};

exports.getAccount = async (req, res, next) => {
  const myTours = await Tour.find({ guides: req.user.id })
    .populate({
      path: "bookings",
      select: "user",
    })
    .populate({
      path: "reviews",
      select: "user",
    });
  const myBookings = await Booking.find({ user: req.user.id }).populate({
    path: "tour",
    select: "name startDate slug",
    populate: { path: "reviews" },
  });
  res.status(200).render("account", { myTours, myBookings });
};

exports.getForgotPasswordForm = (req, res, next) => {
  res.status(200).render("forgotPasswordForm");
};

exports.getresetPasswordForm = (req, res, next) => {
  res.status(200).render("resetPasswordForm");
};

exports.getCreateTourForm = (req, res, next) => {
  res.status(200).render("createTourForm");
};

exports.getUpdateUserForm = (req, res, next) => {
  res.status(200).render("updateUserForm");
};

exports.getMyTours = async (req, res, next) => {
  const tours = await Tour.find({ guides: { $in: req.user.id } });
  res.status(200).render("myTours", { tours });
};

exports.getTour = async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.tour });
  res.status(200).render("tour", { tour });
};

exports.getReviewForm = async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.tour });
  const guide = tour.guides[0];
  res.status(200).render("createReviewForm", { tour, guide });
};

exports.getUpdateTourForm = async (req, res, next) => {
  req.app.locals.tour = await Tour.findOne({ slug: req.params.tour });
  res.status(200).render("updateTourForm");
};
