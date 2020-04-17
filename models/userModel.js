const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is missing."],
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

const User = mongoose.model("User", userSchema);

module.exports = User;
