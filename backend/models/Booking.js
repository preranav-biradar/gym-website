const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  
  gymId: { type: String, required: true },
  gymName: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", bookingSchema);
