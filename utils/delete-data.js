const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Tour = require("../models/tourModel");
const User = require("../models/userModel");

dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE;
mongoose
  .connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connect successful!");
  });

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    console.log("Data deleted successfully!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--delete") {
  deleteData();
}
