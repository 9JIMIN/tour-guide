/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable import/prefer-default-export */
import axios from "axios";
import { showAlert } from "./alert";

export const createReview = async (
  tourRating,
  tourReview,
  guideRating,
  guideReview,
  tourId
) => {
  try {
    const res = await axios({
      method: "post",
      url: "/reviews",
      data: { tourRating, tourReview, guideRating, guideReview, tourId },
    });
    if (res.data.status === "success") showAlert("success", "review success!");
    window.history.back();
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
