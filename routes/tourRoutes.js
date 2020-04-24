const express = require("express");
const tourController = require("../controllers/tourController");
const userController = require("../controllers/userController");

const router = express.Router();

router
  .route("/")
  .get(tourController.getAllTours)
  .post(
    userController.getCurrentUser,
    tourController.uploadTourImages,
    tourController.resizeTourImages,
    tourController.createTour
  )
  .patch(
    userController.getCurrentUser,
    tourController.uploadTourImages,
    tourController.resizeTourImages,
    tourController.updateTour
  );

module.exports = router;
