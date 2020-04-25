/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable import/prefer-default-export */
import axios from "axios";
import { showAlert } from "./alert";

const stripe = Stripe("pk_test_PYDZp5HEYwoxmuIklFO0HulV00sQQls0cW");

export const createBooking = async (tourId, userName) => {
  try {
    // create session
    const session = await axios({
      method: "get",
      url: `/bookings/checkout-session/${tourId}/${userName}`,
    });

    // redirect to checkout page
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
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
    window.history.back();
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
