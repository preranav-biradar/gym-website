const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const User = require("../models/User");
const Payment = require("../models/Payment");

router.post("/notify", async (req, res) => {
  try {
    const { userId, bookingId, gymName, amount, plan } = req.body || {};

    if (!userId || !bookingId || !gymName || !amount || !plan) {
      return res.status(400).json({ message: "Missing required payment fields." });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    const payment = new Payment({
      userId,
      bookingId,
      gymName,
      amount,
      plan,
      paymentStatus: "success",
    });
    await payment.save();

    console.log(`✅ Payment saved: ${gymName} - ₹${amount} (${plan})`);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "✅ Payment Successful - Gym Booking",
      html: `
        <h2>Payment Confirmation</h2>
        <p>Hi ${user.name || "User"},</p>
        <p>Your payment of <b>₹${amount}</b> for <b>${gymName}</b> (${plan}) has been received successfully.</p>
        <p>Booking ID: <b>${bookingId}</b></p>
        <p>Thank you for choosing our service! 💪</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Payment saved & email sent.", payment });
  } catch (error) {
    console.error("Payment Error:", error);
    res.status(500).json({ message: "Payment processing failed.", error: error.message });
  }
});

module.exports = router;
