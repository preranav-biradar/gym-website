import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const trainers = [
  {
    id: "t1",
    name: "Priya Goyal",
    specialization: "Strength Training",
    experience: "5 years",
    image: "/trainer1.jpg",
    description: "Helps you build muscle and improve strength efficiently."
  },
  {
    id: "t2",
    name: "Neha Singh",
    specialization: "Yoga & Flexibility",
    experience: "3 years",
    image: "/trainer2.jpg",
    description: "Certified yoga instructor focused on flexibility and mindfulness."
  },
  {
    id: "t3",
    name: "Rohit Patil",
    specialization: "Cardio & Weight Loss",
    experience: "4 years",
    image: "/trainer3.jpg",
    description: "Specialist in fat loss programs and HIIT sessions."
  }
];

export default function BookTrainer() {
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [bookingData, setBookingData] = useState({ date: "", time: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleBookClick = (trainer) => {
    setSelectedTrainer(trainer);
    setMessage("");
  };

  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!bookingData.date || !bookingData.time) {
      setMessage("Please select a date and time.");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/trainer", {
        userName: selectedTrainer.name,
        date: bookingData.date,
        time: bookingData.time,
      });
      setMessage("🎉 " + res.data.message);
      setBookingData({ date: "", time: "" });
    } catch (err) {
      setMessage(
        err.response?.data?.message || "❌ Error booking trainer. Please try again."
      );
    }
  };

  // Styles
  const pageStyle = {
    minHeight: "100vh",
    minWidth: "100vw",
    width: "100vw",
    background: "linear-gradient(120deg, #232526 0%, #414345 100%)",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
  };
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
    gap: "32px",
    width :"100%" ,
    maxWidth: "1450px",
    margin: "0 auto",
    padding: "0 24px",
  };
  const cardStyle = {
    borderRadius: "18px",
    overflow: "hidden",
    background: "#23272f",
    textAlign: "center",
    boxShadow: "0 2px 16px rgba(0,0,0,0.18)",
    transition: "transform 0.2s, box-shadow 0.2s",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "420px",
    padding: "32px 18px 24px 18px",
    color: "#fff",
  };
  const imgStyle = {
    width: "160px",
    height: "160px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "18px",
    border: "4px solid #ff9800",
    boxShadow: "0 2px 8px rgba(255,152,0,0.10)",
  };
  const buttonStyle = {
    padding: "10px 0",
    background: "linear-gradient(90deg, #ff5722 0%, #ff9800 100%)",
    color: "#fff",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "1rem",
    marginTop: "18px",
    width: "100%",
    transition: "background 0.2s",
    boxShadow: "0 2px 8px rgba(255,87,34,0.10)",
  };
  const cardHoverStyle = {
    transform: "translateY(-7px) scale(1.03)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.13)",
  };
  const formCardStyle = {
    maxWidth: "420px",
    margin: "0 auto",
    background: "#23272f",
    color: "#fff",
    borderRadius: "18px",
    boxShadow: "0 2px 16px rgba(0,0,0,0.18)",
    padding: "36px 32px 28px 32px",
  };
  const labelStyle = {
    display: "block",
    color: "#ff9800",
    fontWeight: 600,
    marginBottom: "6px",
    textAlign: "left",
  };
  const inputStyle = {
    width: "100%",
    border: "1px solid #444",
    borderRadius: "8px",
    padding: "10px 12px",
    marginBottom: "18px",
    fontSize: "1rem",
    background: "#181a20",
    color: "#fff",
    outline: "none",
  };
  const backBtnStyle = {
    color: "#ff9800",
    background: "none",
    border: "none",
    fontWeight: 600,
    fontSize: "1rem",
    marginBottom: "18px",
    cursor: "pointer",
    textAlign: "left",
    display: "block",
  };
  return (
    <div style={pageStyle}>
      <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <h1 style={{ textAlign: "center", color: "#ff9800", fontWeight: 700, fontSize: "2.2rem", marginBottom: 36, marginTop: 0 }}>Book a Personal Trainer</h1>
        {!selectedTrainer ? (
          <div style={gridStyle}>
            {trainers.map((trainer) => (
              <div
                key={trainer.id}
                style={cardStyle}
                onMouseEnter={e => Object.assign(e.currentTarget.style, cardHoverStyle)}
                onMouseLeave={e => Object.assign(e.currentTarget.style, { transform: "none", boxShadow: cardStyle.boxShadow })}
              >
                <img src={trainer.image} alt={trainer.name} style={imgStyle} />
                <h2 style={{ fontSize: "1.25rem", fontWeight: 700, margin: "0 0 6px 0" }}>{trainer.name}</h2>
                <div style={{ color: "#ff9800", fontWeight: 600, marginBottom: 4 }}>{trainer.specialization}</div>
                <div style={{ color: "#bbb", fontSize: "0.98rem", marginBottom: 8 }}>Experience: {trainer.experience}</div>
                <div style={{ color: "#eee", fontSize: "0.97rem", marginBottom: 12 }}>{trainer.description}</div>
                <button style={buttonStyle} onClick={() => handleBookClick(trainer)}>
                  Book Trainer
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={formCardStyle}>
              <button style={backBtnStyle} onClick={() => setSelectedTrainer(null)}>
                ← Back to trainers
              </button>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: 8, textAlign: "center" }}>
                Booking with {selectedTrainer.name}
              </h2>
              <div style={{ color: "#ff9800", fontWeight: 600, marginBottom: 8, textAlign: "center" }}>
                {selectedTrainer.specialization} | Experience: {selectedTrainer.experience}
              </div>
              <form onSubmit={handleBookingSubmit}>
                <label style={labelStyle}>Select Date</label>
                <input
                  type="date"
                  name="date"
                  value={bookingData.date}
                  onChange={handleChange}
                  style={inputStyle}
                />
                <label style={labelStyle}>Select Time</label>
                <input
                  type="time"
                  name="time"
                  value={bookingData.time}
                  onChange={handleChange}
                  style={inputStyle}
                />
                <button type="submit" style={{ ...buttonStyle, marginTop: 0 }}>
                  Confirm Booking
                </button>
                {message && <div style={{ textAlign: "center", marginTop: 18, color: "#4caf50", fontWeight: 600 }}>{message}</div>}
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
