const mongoose = require("mongoose");
const slugify = require("slugify");

const tourSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Tour name is missing!"] },
  slug: String,
  description: String,
  guides: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
});

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
