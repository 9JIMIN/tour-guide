/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable import/prefer-default-export */
import axios from "axios";
import { showAlert } from "./alert";

export const createTour = async (data) => {
  try {
    const res = await axios({
      method: "post",
      url: "/tours",
      data,
    });
    if (res.data.status === "success")
      showAlert("success", "tour created successfully!");
    window.history.back();
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

export const updateTour = async (data) => {
  try {
    const res = await axios({
      method: "patch",
      url: "/tours",
      data,
    });
    if (res.data.status === "success")
      showAlert("success", "tour updated successfully!");
    window.history.back();
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

export const deleteTour = async (tourId) => {
  try {
    const res = await axios({
      method: "delete",
      url: `/tours/${tourId}`,
    });
    if (res.status === 204) showAlert("success", "tour deleted successfully!");
    location.reload();
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
