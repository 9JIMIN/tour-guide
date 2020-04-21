const express = require("express");
const bookingController = require("../controllers/bookingController");
const userController = require("../controllers/userController");

const router = express.Router();

router
  .route("/")
  .post(userController.getCurrentUser, bookingController.createBooking)
  .delete(bookingController.deleteBooking);

module.exports = router;
