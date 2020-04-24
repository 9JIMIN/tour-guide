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
    description: String,
    imageCover: { type: String },
    images: [{ type: String }],
    price: { type: Number, required: [true, "price is missing!"] },
    group: { type: Number, required: [true, "group is missing!"] },
    startDate: { type: Date, required: [true, "start date is missing!"] },
    endDate: { type: Date, required: [true, "end date is missing!"] },
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
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

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
