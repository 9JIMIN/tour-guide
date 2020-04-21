const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
// const cors = require("cors");
const errorController = require("./controllers/errorController");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const bookingRouter = require("./routes/bookingRoutes");
const viewRouter = require("./routes/viewRoutes");

const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// app.use(cors());
// app.options("*", cors());

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/", viewRouter);
app.use("/tours", tourRouter);
app.use("/users", userRouter);
app.use("/reviews", reviewRouter);
app.use("/bookings", bookingRouter);
app.use(errorController);
module.exports = app;
