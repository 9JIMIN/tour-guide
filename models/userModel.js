const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is missing."],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "email is missing."],
    unique: true,
  },
  role: {
    type: String,
    enum: ["user", "guide", "admin"],
    default: "user",
  },
  ratingsAverage: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
    set: (val) => Math.round(val * 100) / 100,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  password: {
    type: String,
    required: [true, "password is missing."],
  },
  passwordConfirm: {
    type: String,
    required: [true, "passwordConfirm is missing."],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "password is diffrent!",
    },
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (candidate, realPassword) {
  return await bcrypt.compare(candidate, realPassword);
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 1000 * 60 * 10;

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
