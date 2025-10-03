import React, { useState } from "react"; 
import gyms from "./gymsData";

export default function Feedback({ onAddFeedback }) {
  const [feedback, setFeedback] = useState("");
  const [selectedGym, setSelectedGym] = useState(gyms[0].id);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback.trim() === "" || name.trim() === "" || rating === 0) return;

    const gym = gyms.find(g => g.id === selectedGym);
    onAddFeedback({
      id: Date.now(),
      name,
      comment: feedback,
      gymId: gym.id,
      gymName: gym.location,
      gymImage: gym.image,
      date: new Date().toLocaleDateString(),
      rating
    });

    setFeedback("");
    setName("");
    setRating(0);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", padding: "32px" }}>
      <form 
        onSubmit={handleSubmit} 
        style={{ 
          background: "#fff", 
          borderRadius: 16, 
          boxShadow: "0 2px 16px rgba(0,0,0,0.10)", 
          padding: 32, 
          minWidth: 340, 
          maxWidth: 420, 
          width: "100%", 
          display: "flex", 
          flexDirection: "column", 
          gap: 16,
          textAlign: "center"
        }}
      >
        <h2 style={{ marginBottom: "20px", fontSize: "1.8rem", color: "#232526", fontWeight: 700 }}>Share Your Feedback</h2>

        <label style={{ fontWeight: 600, color: "#232526", textAlign: "left" }}>Your Name</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ padding: 10, borderRadius: 8, border: "1px solid #bbb", fontSize: 16 }}
          placeholder="Enter your name"
        />

        <label style={{ fontWeight: 600, color: "#232526", textAlign: "left" }}>Select Gym</label>
        <select value={selectedGym} onChange={e => setSelectedGym(e.target.value)} style={{ padding: 10, borderRadius: 8, border: "1px solid #bbb", fontSize: 16 }}>
          {gyms.map(g => <option key={g.id} value={g.id}>{g.location}</option>)}
        </select>

        <label style={{ fontWeight: 600, color: "#232526", textAlign: "left" }}>Your Feedback</label>
        <textarea
          placeholder="Write your feedback here..."
          value={feedback}
          onChange={e => setFeedback(e.target.value)}
          style={{ padding: 12, fontSize: 16, borderRadius: 8, border: "1px solid #bbb", resize: "vertical", minHeight: 100 }}
        />

        {/* Rating */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              style={{
                fontSize: "1.8rem",
                color: star <= rating ? "#ff9800" : "#ccc",
                cursor: "pointer",
                margin: "0 5px",
                transition: "color 0.2s"
              }}
            >
              ★
            </span>
          ))}
        </div>

        <button
          type="submit"
          style={{
            padding: 12,
            fontSize: 16,
            borderRadius: 8,
            border: "none",
            background: "linear-gradient(90deg, #ff5722 0%, #ff9800 100%)",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
            transition: "background 0.2s"
          }}
        >
          Submit Feedback
        </button>

        {submitted && <span style={{ color: "green", marginTop: 10 }}>Thank you for your feedback!</span>}
      </form>
    </div>
  );
}
