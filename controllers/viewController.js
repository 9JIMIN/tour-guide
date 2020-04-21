const Tour = require("../models/tourModel");

exports.getOverview = async (req, res, next) => {
  res.status(200).render("overview"); // {}안에 넣어야 전달이 됨.
};

exports.getSignupForm = (req, res, next) => {
  res.status(200).render("signupForm");
};

exports.getLoginForm = (req, res, next) => {
  res.status(200).render("login");
};

exports.getAccount = (req, res, next) => {
  res.status(200).render("account");
};

exports.getForgotPasswordForm = (req, res, next) => {
  res.status(200).render("forgot");
};

exports.getresetPasswordForm = (req, res, next) => {
  res.status(200).render("resetPassword");
};

exports.getCreateTourForm = (req, res, next) => {
  res.status(200).render("createTourForm");
};

exports.getUpdateUserForm = (req, res, next) => {
  res.status(200).render("updateUser");
};

exports.getMyTours = async (req, res, next) => {
  const tours = await Tour.find({ guides: { $in: req.user.id } });
  res.status(200).render("myTours", { tours });
};

exports.getTour = async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: "reviews",
    fields: "user",
  });
  req.app.locals.tourId = tour.id;
  res.status(200).render("tour", { tour });
};
