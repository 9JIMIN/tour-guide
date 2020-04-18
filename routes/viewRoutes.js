const express = require("express");
const viewController = require("../controllers/viewController");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/", userController.isLoggedIn, viewController.getOverview);
router.get("/signup", viewController.getSignupForm);
router.get("/login", viewController.getLoginForm);
router.get("/me", viewController.getAccount);
router.get("/forgotPassword", viewController.getForgotPasswordForm);
router.get(
  "/resetPassword/:token",
  userController.checkToken,
  viewController.getresetPasswordForm
);

module.exports = router;
