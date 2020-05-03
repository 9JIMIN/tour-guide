const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

const errorController = require("./controllers/errorController");
const bookingController = require("./controllers/bookingController");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const bookingRouter = require("./routes/bookingRoutes");
const viewRouter = require("./routes/viewRoutes");

const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(cors());
app.options("*", cors());

app.post(
  "/webhook-checkout",
  bodyParser.raw({ type: "application/json" }),
  bookingController.webhookCheckout
);

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(express.static(path.join(__dirname, "public")));
app.use(helmet());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(mongoSanitize());
app.use(xss());

app.use("/users", userRouter);
app.use("/tours", tourRouter);
app.use("/reviews", reviewRouter);
app.use("/bookings", bookingRouter);
app.use("/", viewRouter);
app.use(errorController);
module.exports = app;
