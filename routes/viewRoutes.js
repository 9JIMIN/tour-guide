const express = require("express");
const viewController = require("../controllers/viewController");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/", userController.isLoggedIn, viewController.getOverview);
router.get("/signup", viewController.getSignupForm);
router.get("/login", viewController.getLoginForm);
router.get("/me", userController.isLoggedIn, viewController.getAccount);
router.get(
  "/updateUser",
  userController.isLoggedIn,
  viewController.getUpdateUserForm
);
router.get(
  "/createTour",
  userController.isLoggedIn,
  viewController.getCreateTourForm
);
router.get("/my-tours", userController.isLoggedIn, viewController.getMyTours);
router.get("/forgotPassword", viewController.getForgotPasswordForm);
router.get(
  "/resetPassword/:token",
  userController.checkToken,
  viewController.getresetPasswordForm
);
router.get("/tour/:slug", userController.isLoggedIn, viewController.getTour);
// is logged in 검사하는거 url에 누르면 들어올수있는거 방지할라고 그렇다기에 에러가 없지 그냥 user를 쓰기위해서그럼
module.exports = router;
