/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable import/prefer-default-export */
import axios from "axios";
import { showAlert } from "./alert";

export const createBooking = async (tour) => {
  try {
    const res = await axios({
      method: "post",
      url: "/bookings",
      data: { tour },
    });
    if (res.data.status === "success")
      showAlert("success", "Booking successfully!");

    location.assign("/");
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

export const deleteBooking = async (booking) => {
  try {
    const res = await axios({
      method: "delete",
      url: "/bookings",
      data: { booking },
    });
    if (res.data.status === "success") showAlert("success", "booking deleted!");

    location.assign("/");
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
