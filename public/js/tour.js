/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable import/prefer-default-export */
import axios from "axios";
import { showAlert } from "./alert";

export const createTour = async (
  name,
  description,
  price,
  group,
  startDate,
  endDate
) => {
  try {
    const res = await axios({
      method: "post",
      url: "/tours",
      data: { name, description, price, group, startDate, endDate },
    });
    if (res.data.status === "success")
      showAlert("success", "tour created successfully!");
    window.history.back();
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
