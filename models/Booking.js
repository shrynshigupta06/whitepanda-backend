const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car"
    },
    issueDate: Date,
    returnDate: Date,
    totalRent: Number,
    returned: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = Booking = mongoose.model("booking", BookingSchema);
