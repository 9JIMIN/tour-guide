const Tour = require("../models/tourModel");

exports.getOverview = async (req, res, next) => {
  const tours = await Tour.find();
  res.status(200).render("overview", { tours }); // {}안에 넣어야 전달이 됨.
};

exports.getSignupForm = (req, res, next) => {
  res.status(200).render("signup");
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
