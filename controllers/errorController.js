const AppError = require("../utils/appError");

const jwtExipredError = () => {
  return new AppError("토큰이 만료됨, 다시 로그인하세요.", 401);
};

const jwtMalFormError = () => {
  return new AppError("토큰이 파기됨, 로그인 해주세요!.", 401);
};

const sendError = (err, req, res) => {
  // res.status(err.statusCode).json({
  //   status: "error",
  //   message: err.message,
  //   에러전체: err,
  //   파일경로: err.stack,
  // });
  res.status(err.statusCode).render("error", { message: err.message });
};

module.exports = (err, req, res, next) => {
  console.log(err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  let error = Object.create(err);
  if (error.name === "TokenExipredError") error = jwtExipredError();
  if (error.name === "JsonWebTokenError") error = jwtMalFormError();
  sendError(error, req, res);
};
