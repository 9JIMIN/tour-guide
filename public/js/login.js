/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable import/prefer-default-export */
import axios from "axios";
import { async } from "regenerator-runtime";

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: "post",
      url: "/users/login",
      data: { email, password },
    });
    if (res.data.status === "success") {
      window.setTimeout(() => {
        location.assign("/");
      }, 500);
    }
  } catch (err) {
    console.log(err);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: "get",
      url: "/users/logout",
    });
    if (res.data.status === "success") {
      window.setTimeout(() => {
        location.assign("/");
      }, 500);
    }
  } catch (err) {
    console.log(err);
  }
};
