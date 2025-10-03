import React, { useState, useEffect } from "react";
import gyms from "./gymsData";
import Feedback from "./FeedBack";


const initialReviews = [
  {
    id: 1,
    name: "THIRUMALESH GOUD",
    comment: "From mallareddy University, Trainer Harish sir is excellent to train and motivate, to do hard workout!! His thoughts in gym, variations is excellent.",
    gymId: "g1",
    gymName: gyms[0].location,
    gymImage: gyms[0].image,
    date: "JANUARY 26, 2024",
    rating: 5
  },
  {
    id: 2,
    name: "SIDDHARTH KEWALRAMANI",
    comment: "Family friendly gym, strongly recommended, I have lost 5kg in 1 month in body sculpt program.",
    gymId: "g2",
    gymName: gyms[1].location,
    gymImage: gyms[1].image,
    date: "FEBRUARY 27, 2024",
    rating: 5
  },

];


function getStoredReviews() {
  const stored = localStorage.getItem("reviews");
  if (stored) return JSON.parse(stored);
  return initialReviews;
}

export default function Review() {
  const [reviews, setReviews] = useState(getStoredReviews());

  // Add feedback from Feedback page as a review

  const handleAddFeedback = (feedback) => {
    const updated = [feedback, ...reviews];
    setReviews(updated);
    localStorage.setItem("reviews", JSON.stringify(updated));
  };

  const handleDeleteReview = (id) => {
    const updated = reviews.filter(r => r.id !== id);
    setReviews(updated);
    localStorage.setItem("reviews", JSON.stringify(updated));
  };
  

  useEffect(() => {
    // On mount, sync reviews from localStorage if changed elsewhere
    const sync = () => {
      const stored = localStorage.getItem("reviews");
      if (stored) setReviews(JSON.parse(stored));
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  return (
    <div style={{ padding: 0, background: "#f7f8fa", minHeight: "100vh", width: "100vw", boxSizing: "border-box" }}>
      <h1 style={{ textAlign: "center", fontSize: "2.3rem", fontWeight: 700, color: "#232526", marginBottom: 36, marginTop: 0 }}>Client Testimonials & Reviews</h1>
      <div style={{ width: "100vw", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh", marginBottom: 40 }}>
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Feedback onAddFeedback={handleAddFeedback} />
        </div>
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(370px, 1fr))",
        gap: 32,
        width: "100vw",
        margin: 0,
        padding: "0 32px 32px 32px",
        boxSizing: "border-box"
      }}>
        {reviews.map((rev, idx) => (
          <div key={rev.id} style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 16px rgba(0,0,0,0.10)", padding: 28, position: "relative", minHeight: 220, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            {/* Delete button */}
            <button
              onClick={() => handleDeleteReview(rev.id)}
              title="Delete review"
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                background: "none",
                border: "none",
                color: "#ff5722",
                fontSize: 20,
                cursor: "pointer",
                padding: 0,
                zIndex: 2,
                transition: "color 0.2s"
              }}
              onMouseEnter={e => e.currentTarget.style.color = "#b71c1c"}
              onMouseLeave={e => e.currentTarget.style.color = "#ff5722"}
            >
              🗑️
            </button>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
              <img src={rev.gymImage} alt={rev.gymName} style={{ width: 54, height: 54, borderRadius: 12, objectFit: "cover", marginRight: 16, border: "2px solid #ff9800" }} />
              <div>
                <div style={{ fontWeight: 700, color: "#232526", fontSize: "1.1rem" }}>{rev.gymName}</div>
                <div style={{ color: "#ff9800", fontWeight: 600, fontSize: "1.05rem" }}>{"★".repeat(rev.rating)}<span style={{ color: "#bbb", fontWeight: 400, marginLeft: 6 }}>{rev.rating}.0</span></div>
              </div>
            </div>
            <div style={{ fontSize: "1.08rem", color: "#232526", marginBottom: 18, fontStyle: "italic" }}>
              <span style={{ fontSize: 28, color: "#ff9800", verticalAlign: "middle" }}>“</span>{rev.comment}
            </div>
            <div style={{ display: "flex", alignItems: "center", marginTop: "auto" }}>
              <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#ff9800", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 18, marginRight: 12 }}>
                {rev.name[0]}
              </div>
              <div>
                <div style={{ fontWeight: 600, color: "#232526", fontSize: 15 }}>{rev.name}</div>
                <div style={{ color: "#888", fontSize: 13 }}>{rev.date}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
