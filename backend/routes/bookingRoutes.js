const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// POST: Save a new booking
router.post("/", async (req, res) => {
  try {
    const { userId, gymId, gymName, price } = req.body;

    if (!userId || !gymId || !gymName || !price) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newBooking = new Booking({ userId, gymId, gymName, price });
    await newBooking.save();

    res.status(201).json({ message: "Booking saved successfully", booking: newBooking });
  } catch (err) {
    console.error("❌ Booking save error:", err);
    res.status(500).json({ message: "Server error while saving booking" });
  }
});

// DELETE: Cancel a booking by ID
router.delete("/:id", async (req, res) => {
  try {
    const bookingId = req.params.id;

    const deletedBooking = await Booking.findByIdAndDelete(bookingId);

    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking canceled successfully" });
  } catch (err) {
    console.error("❌ Booking cancel error:", err);
    res.status(500).json({ message: "Server error while canceling booking" });
  }
});

module.exports = router;
