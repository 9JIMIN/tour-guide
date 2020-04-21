/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable node/no-unsupported-features/es-syntax */
import "core-js/stable";
import "regenerator-runtime/runtime.js";

import { login, logout, signup, forgot, reset, updateUser } from "./user.js";
import { createTour, tourReview } from "./tour.js";
import { createBooking, deleteBooking } from "./booking.js";
import { createReview } from "./review.js";

const signupForm = document.querySelector(".form--signup");
const loginForm = document.querySelector(".form--login");
const logoutBtn = document.getElementById("logout");
const updateData = document.querySelector(".form--updateData");
const updatePassword = document.querySelector(".form--updatePassword");
const forgotPassword = document.querySelector(".form--forgotPassword");
const resetPassword = document.querySelector(".form--resetPassword");
const tourForm = document.querySelector(".form--createTour");
const reviewForm = document.querySelector(".form--review");
const bookingBtn = document.getElementById("booking");
const cancelBookingBtn = document.getElementById("cancelBooking");
const guideReviewForm = document.querySelector(".form--guideReview");

if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;
    signup(name, email, password, passwordConfirm);
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
  });
}

if (logoutBtn) logoutBtn.addEventListener("click", logout);

if (updateData) {
  updateData.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    updateUser({ name, email }, "user");
  });
}
if (updatePassword) {
  updatePassword.addEventListener("submit", (e) => {
    e.preventDefault();
    const currentPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const newPasswordConfirm = document.getElementById("newPasswordConfirm")
      .value;
    updateUser(
      { currentPassword, newPassword, newPasswordConfirm },
      "password"
    );
  });
}
if (forgotPassword) {
  forgotPassword.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    forgot(email);
  });
}

if (resetPassword) {
  resetPassword.addEventListener("submit", (e) => {
    e.preventDefault();
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;
    reset(password, passwordConfirm);
  });
}

if (tourForm) {
  tourForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const group = document.getElementById("group").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    createTour(name, description, price, group, startDate, endDate);
  });
}

if (reviewForm) {
  reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const review = document.getElementById("review").value;
    tourReview(review);
  });
}

if (bookingBtn)
  bookingBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.target.textContent = "Processing...";
    const { tour } = e.target.dataset;
    createBooking(tour);
  });

if (cancelBookingBtn)
  cancelBookingBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const { booking } = e.target.dataset;
    deleteBooking(booking);
  });

if (guideReviewForm)
  guideReviewForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const rating = document.getElementById("rating").value;
    const review = document.getElementById("review").value;
    createReview(rating, review);
  });
