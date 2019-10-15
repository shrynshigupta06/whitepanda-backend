const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema(
  {
    model: { type: String, required: true },
    seater: { type: Number, required: true },
    bags: { type: Number, required: true },
    transmission: { type: String, enum: ["automatic", "manual"] },
    group: {
      type: String,
      enum: ["Hatchback", "Sedan", "SUV", "Luxury"],
      required: true
    },
    available: { type: Boolean, required: true },
    booked: { type: Boolean, default: false },
    rentPerDay: { type: Number, required: true }
  },
  { timestamps: true }
);

module.exports = Car = mongoose.model("car", CarSchema);
