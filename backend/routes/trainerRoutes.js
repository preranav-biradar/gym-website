// const express = require("express");
// const router = express.Router();

// // Test GET
// router.get("/", (req, res) => {
//   res.send("Trainer route works!");
// });

// // Test POST
// router.post("/", (req, res) => {
//   console.log("POST request body:", req.body);
//   res.status(201).json({ message: "Trainer booking confirmed", booking: req.body });
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const TrainerBooking = require("../models/TrainerBooking");

// POST: Book a trainer
router.post("/", async (req, res) => {
  try {
    const { userName, date, time } = req.body;

    if (!userName || !date || !time) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newBooking = new TrainerBooking({ userName, date, time });
    await newBooking.save();

    res.status(201).json({
      message: `🎉 Trainer ${userName} booked successfully on ${date} at ${time}`,
      booking: newBooking,
    });
  } catch (err) {
    console.error("❌ Trainer booking error:", err);
    res.status(500).json({ message: "Server error while booking trainer" });
  }
});

// GET: List all trainer bookings (optional)
router.get("/", async (req, res) => {
  try {
    const bookings = await TrainerBooking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    console.error("❌ Error fetching bookings:", err);
    res.status(500).json({ message: "Server error while fetching bookings" });
  }
});

module.exports = router;
