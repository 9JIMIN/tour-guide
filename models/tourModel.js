const mongoose = require("mongoose");
const slugify = require("slugify");

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tour name is missing!"],
      unique: true,
    },
    slug: String,
    description: { type: String, required: [true, "description is missging!"] },
    imageCover: { type: String },
    images: [{ type: String }],
    price: { type: Number, required: [true, "price is missing!"] },
    group: { type: Number, required: [true, "group is missing!"] },
    startDate: { type: Date, required: [true, "start date is missing!"] },
    endDate: { type: Date, required: [true, "end date is missing!"] },
    ratingsAverage: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
      set: (val) => Math.round(val * 100) / 100,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    locations: [
      {
        type: { type: String, default: "Point", enum: ["Point"] },
        name: String,
        day: Number,
        coordinates: [Number],
        description: String,
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: "guides",
  });
  next();
});

tourSchema.virtual("bookings", {
  ref: "Booking",
  foreignField: "tour",
  localField: "_id",
});

tourSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "tour",
  localField: "_id",
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
