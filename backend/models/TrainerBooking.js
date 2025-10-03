const mongoose = require("mongoose");

const trainerBookingSchema = new mongoose.Schema({
  userName: { type: String, required: true },   
  date: { type: String, required: true },       
  time: { type: String, required: true },       
  createdAt: { type: Date, default: Date.now }, 
});

module.exports = mongoose.model("TrainerBooking", trainerBookingSchema);
