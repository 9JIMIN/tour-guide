const express = require("express");
const bookingController = require("../controllers/bookingController");
const userController = require("../controllers/userController");

const router = express.Router();

router.get(
  "/checkout-session/:tourId/:userName",
  userController.getCurrentUser,
  bookingController.getCheckoutSession
);

router.route("/").delete(bookingController.deleteBooking);

module.exports = router;
