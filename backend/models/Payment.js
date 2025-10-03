const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
  gymName: { type: String, required: true },
  amount: { type: Number, required: true },
  plan: { type: String, required: true }, // 1 Day / 1 Month / 1 Year
  paymentStatus: { type: String, default: "success" },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Payment", paymentSchema);
