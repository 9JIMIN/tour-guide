/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable import/prefer-default-export */
import axios from "axios";

export const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: "post",
      url: "/users/signup",
      data: { name, email, password, passwordConfirm },
    });
    if (res.data.status === "success") {
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    console.log(err);
  }
};
