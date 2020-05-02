const AppError = require("../utils/appError");

const jwtExipredError = () => {
  return new AppError("Token expired! login again.", 401);
};

const jwtMalFormError = () => {
  return new AppError("please login again.", 401);
};

const sendError = (err, req, res) => {
  res.status(err.statusCode).json({
    status: "error",
    message: err.message,
  });
  res.status(err.statusCode).render("error", { message: err.message });
};

module.exports = (err, req, res, next) => {
  console.log(err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  let error = Object.create(err);
  if (error.name === "TokenExipredError") error = jwtExipredError();
  if (error.name === "JsonWebTokenError") error = jwtMalFormError();

  if (
    error.message.startsWith("User validation") ||
    error.message.startsWith("Tour validation")
  ) {
    if (error.message.includes(",")) {
      error.message = error.message.split(",")[0];
    }
    error.message = error.message.split(": ")[2];
    if (error.message.startsWith("Cast to Number")) {
      error.message = "only number to price, group and day";
    }
  }
  if (error.code === 11000) {
    error.message = "that name is already used!";
  }

  if (error.message.startsWith("Validation failed")) {
    if (error.message.includes(",")) {
      error.message = error.message.split(",")[0];
    }
    error.message = error.message.split(":")[2];
  }
  if (error.message.startsWith("Cast to number")) {
    error.message = "only number to price and group";
  }
  sendError(error, req, res);
};
