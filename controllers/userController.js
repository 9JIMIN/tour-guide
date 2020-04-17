const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const sendToken = (user, res) => {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 1000 * 60 * 60 * 24
    ),
    httpOnly: true,
  });
};

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);

    sendToken(newUser, res);
    res.status(201).json({
      status: "success",
      data: newUser,
    });
  } catch (err) {
    return next(err); //리턴을 하면 next가 가능하네
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return next(new Error("email or password missing!"));

    const user = await User.findOne({ email });
    if (!user) return next(new Error("theres no matching user!"));

    const passwordCorrect = await user.correctPassword(password, user.password);
    if (!passwordCorrect) return next(new Error("password is wrong!"));

    sendToken(user, res);
    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (err) {
    return next(err);
  }
};

exports.logout = (req, res, next) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 1000 * 10),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      const currentUser = await User.findById(decoded.id);
      if (!currentUser) return next();

      res.locals.user = currentUser;
      req.user = currentUser;

      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};

exports.updateUser = async (req, res, next) => {
  try {
    const updateUser = await User.findByIdAndUpdate(req.user.id, req.body, {
      runValidators: true,
      new: true,
    });
    res.status(200).json({
      status: "success",
      data: { updateUser },
    });
  } catch (err) {
    return next(err);
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!(await user.correctPassword(req.body.currentPassword, user.password)))
      return next(new Error("password is wrong!"));

    user.password = req.body.newPassword;
    user.passwordConfirm = req.body.newPasswordConfirm;
    await user.save();

    sendToken(user, res);
    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (err) {
    return next(err);
  }
};
