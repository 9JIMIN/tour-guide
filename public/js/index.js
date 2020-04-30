/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable node/no-unsupported-features/es-syntax */
import "core-js/stable";
import "regenerator-runtime/runtime.js";

import { login, logout, signup, forgot, reset, updateUser } from "./user.js";
import { createTour, updateTour, deleteTour } from "./tour.js";
import { createBooking, deleteBooking } from "./booking.js";
import { createReview } from "./review.js";

//user
const signupForm = document.querySelector(".form--signup");
const loginForm = document.querySelector(".form--login");
const updateDataForm = document.querySelector(".form--updateData");
const updatePasswordForm = document.querySelector(".form--updatePassword");
const logoutBtn = document.getElementById("logout");
const forgotPassword = document.querySelector(".form--forgotPassword");
const resetPassword = document.querySelector(".form--resetPassword");
//tour
const tourForm = document.querySelector(".form--createTour");
const updateTourForm = document.querySelector(".form--updateTour");
const deleteTourBtn = document.querySelectorAll(".deleteTour");
const lastTourPage = document.querySelectorAll(".page");
//review
const createReviewForm = document.querySelector(".form--createReview");
//booking
const bookingBtn = document.getElementById("booking");
const deleteBookingBtn = document.querySelectorAll(".deleteBooking");

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

if (updateDataForm) {
  updateDataForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", document.getElementById("name").value);
    form.append("email", document.getElementById("email").value);
    form.append("photo", document.getElementById("photo").files[0]);
    updateUser(form, "user");
  });
}
if (updatePasswordForm) {
  updatePasswordForm.addEventListener("submit", (e) => {
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
    const form = new FormData();
    form.append("name", document.getElementById("name").value);
    form.append("description", document.getElementById("description").value);
    form.append("price", document.getElementById("price").value);
    form.append("group", document.getElementById("group").value);
    form.append("startDate", document.getElementById("startDate").value);
    form.append("endDate", document.getElementById("endDate").value);
    form.append("imageCover", document.getElementById("imageCover").files[0]);
    const ins = document.getElementById("images").files.length;
    for (let x = 0; x < ins; x++) {
      form.append("images", document.getElementById("images").files[x]);
    }
    createTour(form);
  });
}

if (updateTourForm) {
  updateTourForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", document.getElementById("name").value);
    form.append("description", document.getElementById("description").value);
    form.append("price", document.getElementById("price").value);
    form.append("group", document.getElementById("group").value);
    form.append("startDate", document.getElementById("startDate").value);
    form.append("endDate", document.getElementById("endDate").value);
    form.append("imageCover", document.getElementById("imageCover").files[0]);
    const ins = document.getElementById("images").files.length;
    for (let i = 0; i < ins; i++) {
      form.append("images", document.getElementById("images").files[i]);
    }
    updateTour(form);
  });
}

if (bookingBtn)
  bookingBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.target.textContent = "Processing...";
    const { tourId } = e.target.dataset;
    const { userName } = e.target.dataset;
    createBooking(tourId, userName);
  });

if (deleteBookingBtn)
  deleteBookingBtn.forEach((el) =>
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const { bookingId } = e.target.dataset;
      deleteBooking(bookingId);
    })
  );

if (createReviewForm)
  createReviewForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const tourRating = document.getElementById("tourRating").value;
    const tourReview = document.getElementById("tourReview").value;
    const guideRating = document.getElementById("guideRating").value;
    const guideReview = document.getElementById("guideReview").value;
    const { tourId } = document.getElementById("reviewCreateBtn").dataset;
    createReview(tourRating, tourReview, guideRating, guideReview, tourId);
  });

if (deleteTourBtn)
  deleteTourBtn.forEach((el) =>
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const { tourId } = e.target.dataset;
      deleteTour(tourId);
    })
  );
/* 
if (lastTourPage)
  lastTourPage.addEventListener("click", (e) => {
    e.preventDefault();
    const currentPage = e.target.value;
    console.log(currentPage);
    if (currentPage % 3 === 0) {
      res.locals.nextPage = currentPage;
    }else{
      res.locals
    }
  }); */
