/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable import/prefer-default-export */
import axios from "axios";
import { showAlert } from "./alert";

export const createReview = async (rating, review) => {
  try {
    const res = await axios({
      method: "post",
      url: "/reviews",
      data: { rating, review },
    });
    if (res.data.status === "success") showAlert("success", "review success!");
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
