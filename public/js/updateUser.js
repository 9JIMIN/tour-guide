/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable import/prefer-default-export */
import axios from "axios";
import { showAlert } from "./alert";

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
      location.assign("/me");
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
    console.log(err.response.data.message);
  }
};
