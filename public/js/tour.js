/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable import/prefer-default-export */
import axios from "axios";
import { showAlert } from "./alert";

export const createTour = async (name, description) => {
  try {
    const res = await axios({
      method: "post",
      url: "/tours",
      data: { name, description },
    });
    if (res.data.status === "success")
      showAlert("success", "tour created successfully!");
    location.assign("/me");
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

export const tourReview = async (review) => {
  try {
    const res = await axios({
      method: "post",
      url: "/reviews",
      data: { review },
    });
    if (res.data.status === "success")
      showAlert("success", "review created successfully!");
    location.reload();
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
