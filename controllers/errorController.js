const mongoError = (err) => {
  const value = err.errmsg.match(/"(.*?)"/)[1];
  err.message = `${value} is already used. please use another value!`;
};

const sendError = (err, req, res) => {
  res.status(err.statusCode).json({
    status: "error",
    message: err.message,
    에러전체: err,
    파일경로: err.stack,
  });
  console.log(err);
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  const error = Object.create(err);
  if (error.name === "MongoError") mongoError(error);
  sendError(error, req, res);
};
