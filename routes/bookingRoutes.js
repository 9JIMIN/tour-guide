const express = require("express");
const bookingController = require("../controllers/bookingController");
const userController = require("../controllers/userController");

const router = express.Router();

router.post(
  "/",
  userController.getCurrentUser,
  bookingController.createBooking
);

module.exports = router;
