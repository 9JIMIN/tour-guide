/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable node/no-unsupported-features/es-syntax */
import "core-js/stable";
import "regenerator-runtime/runtime.js";
import { signup } from "./signup.js";
import { login, logout } from "./login.js";
import { updateUser } from "./updateUser";

const signupForm = document.querySelector(".form--signup");
const loginForm = document.querySelector(".form--login");
const logoutBtn = document.querySelector(".logout");
const updateData = document.querySelector(".form--updateData");
const updatePassword = document.querySelector(".form--updatePassword");

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
