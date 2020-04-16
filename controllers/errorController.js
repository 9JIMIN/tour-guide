module.exports = (err, req, res, next) => {
  if (err.name === "MongoError") {
    const value = err.errmsg.match(/"(.*?)"/)[1];
    res.status(401).json({
      status: "fail",
      message: `${value} is already used. please use another value!`,
      에러전체: err,
      파일최라락: err.stack,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: err.message,
      한마디: "자 이게 보이면 이건 정의안된 에러니까 정의하렴",
      에러전체: err,
      파일촤라락: err.stack,
    });
  }
};
