/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable import/prefer-default-export */
import axios from "axios";
import { showAlert } from "./alert";

export const forgot = async (email) => {
  try {
    const res = await axios({
      method: "post",
      url: "/users/forgotPassword",
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
    if (res.data.status === "success") showAlert("success", "password changed");
  } catch (err) {
    showAlert("error", err.response.data.message);
    console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥");
  }
};
