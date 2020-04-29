const { promisify } = require("util");
const { unlinkSync } = require("fs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const sharp = require("sharp");
const User = require("../models/userModel");
const Email = require("../utils/email");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Please upload only image", 400), false);
  }
};
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadUserPhoto = upload.single("photo");
exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  if (req.user.photo && req.user.photo !== "default.jpg")
    unlinkSync(`public/img/users/${req.user.photo}`);
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user.id);

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 1000 * 60 * 60 * 24
    ),
    httpOnly: true,
  });
  res.status(statusCode).json({
    status: "success",
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  createSendToken(newUser, 201, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("email or password missing!", 401));

  const user = await User.findOne({ email });
  if (!user) return next(new AppError("theres no matching user!", 401));

  const passwordCorrect = await user.correctPassword(password, user.password);
  if (!passwordCorrect) return next(new AppError("password is wrong!", 401));

  createSendToken(user, 200, req, res);
});

exports.logout = (req, res, next) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 1000 * 10),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

exports.getCurrentUser = catchAsync(async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      const currentUser = await User.findById(decoded.id).populate({
        path: "reviewsIget",
        populate: { path: "tour" },
      });
      if (req.params.user && currentUser.name !== req.params.user) {
        req.paramsUser = await User.findOne({ name: req.params.user }).populate(
          "reviewsIget"
        );
        res.locals.paramsUser = req.paramsUser;
      }
      if (!currentUser) return next();

      res.locals.user = currentUser;
      req.user = currentUser;

      return next();
    } catch (err) {
      return next();
    }
  }
  next();
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const userObj = { name: req.body.name, email: req.body.email };
  if (req.file) userObj.photo = req.file.filename;

  const updateUser = await User.findByIdAndUpdate(req.user.id, userObj, {
    runValidators: true,
    new: true,
  });

  res.status(200).json({
    status: "success",
    data: { updateUser },
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!(await user.correctPassword(req.body.currentPassword, user.password)))
    return next(new AppError("password is wrong!", 401));

  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.newPasswordConfirm;
  await user.save();

  createSendToken(user, 200, req, res);
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1. email을 받아서 DB에 검색
  // 2. 없으면 애러, 있으면 메일보냄
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new AppError("No user exist!", 404));

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  try {
    const url = `${req.protocol}://${req.get(
      "host"
    )}/password_reset/${resetToken}`;
    //sendmail
    await new Email(user, url).sendPasswordReset();
    res.status(200).json({
      status: "success",
      message: "mail was sended!",
    });
  } catch (err) {
    this.passwordResetToken = undefined;
    this.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new AppError("There was an error sending the email.", 500));
  }
});

exports.checkToken = catchAsync(async (req, res, next) => {
  // 1. params에 있는 토큰 분리
  // 2. 토큰을 encrypt해서 DB토큰이랑 비교, 시간도 체크
  // 3. 맞으면, req.body로 받은 비번으로 바꿔줌.
  // 4. 토큰 부여
  const resetToken = req.params.token;
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    res.status(404).render("error", { message: "token is invalid" });
  }
  //console.log(user);
  req.app.locals.reset = user;
  next();
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const user = req.app.locals.reset;
  req.app.locals.reset = undefined;

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  createSendToken(user, 200, req, res);
});

exports.getGuideStats = catchAsync(async (req, res, next) => {
  const guides = await User.find({ role: "guide" })
    .sort("-ratingsAverage")
    .limit(10);
  res.locals.guides = guides;

  next();
});
