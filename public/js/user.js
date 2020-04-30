/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable import/prefer-default-export */
import axios from "axios";
import { showAlert } from "./alert";

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: "post",
      url: "/users/login",
      data: { email, password },
    });
    if (res.data.status === "success") {
      showAlert("success", "Login successfully!");

      location.assign("/");
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
    console.log(err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: "get",
      url: "/users/logout",
    });
    if (res.data.status === "success") {
      showAlert("success", "Logout successfully!");

      location.assign("/");
    }
  } catch (err) {
    console.log(err);
  }
};

export const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: "post",
      url: "/users/signup",
      data: { name, email, password, passwordConfirm },
    });
    if (res.data.status === "success") {
      showAlert("success", "sign up success! please check your email");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
    console.log(err.response.data.message);
  }
};

export const updateUser = async (data, type) => {
  try {
    const url = type === "user" ? "/users/me" : "/users/password";
    const res = await axios({
      method: "patch",
      url,
      data,
    });
    if (res.data.status === "success") {
      showAlert("success", "user data changed!");
      window.location = document.referrer;
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
    console.log(err.response.data.message);
  }
};

export const forgot = async (email) => {
  try {
    const res = await axios({
      method: "post",
      url: "/users/password_reset",
      data: { email },
    });
    if (res.data.status === "success")
      showAlert("success", "email was sended!");
  } catch (err) {
    showAlert("error", err.response.data.message);
    console.log(err);
  }
};

export const reset = async (password, passwordConfirm) => {
  try {
    const res = await axios({
      method: "patch",
      url: "/users/resetPassword",
      data: { password, passwordConfirm },
    });
    if (res.data.status === "success") {
      showAlert("success", "password changed");
      location.assign("/");
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
