import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaDumbbell, FaClipboardList, FaUser, FaSignOutAlt, FaComment, FaStar, FaChalkboardTeacher, FaCreditCard } from "react-icons/fa";

export default function Dashboard() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  // If user is not logged in, redirect to home
  if (!userId) {
    navigate("/");
  }

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      {/* Sidebar */}
      <div style={{ width: "220px", background: "#1f1f1f", color: "#fff", display: "flex", flexDirection: "column" }}>
        {/* Profile section */}
        <div style={{ padding: "20px", borderBottom: "1px solid #444", textAlign: "center" }}>
          <FaUser size={50} style={{ marginBottom: 10 }} />
          <h3 style={{ margin: 0, fontSize: "18px" }}>User Profile</h3>
          <p style={{ fontSize: "14px", color: "#aaa" }}>{userId}</p>
        </div>

        {/* Menu */}
        <nav style={{ flex: 1, display: "flex", flexDirection: "column", marginTop: 20 }}>
          <Link to="gymlisting" style={menuStyle}><FaDumbbell /> Gym Listing</Link>
          
          <Link to="review" style={menuStyle}><FaStar /> Review</Link>
          
          <Link to="booktrainer" style={menuStyle}><FaChalkboardTeacher /> Book Trainer</Link>
          <Link to="payment" style={menuStyle}><FaCreditCard /> Payment</Link>

          <button onClick={handleLogout} style={{ ...menuStyle, border: "none", background: "none", cursor: "pointer", textAlign: "left" }}>
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, background: "#f5f5f5", padding: 0, minWidth: 0, position: "relative" }}>
        <Outlet /> {/* Nested routes/pages will render here */}

        {/* 6 Images Grid - Full Width */}
        <style>{`
          @keyframes slideUpFade {
            0% { opacity: 0; transform: translateY(40px) scale(1.08); }
            60% { opacity: 0.7; transform: translateY(-8px) scale(1.02); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            marginTop: "20px",
            width: "calc(100vw - 220px)",
            maxWidth: "calc(100vw - 220px)",
            marginLeft: 0,
            marginRight: 0,
            boxSizing: "border-box",
          }}
        >
          {["/p1.jpg","/0.jpg","/p3.jpg","/o.jpg","/p7.jpg","/o1.jpg"].map((src, idx) => (
            <img
              key={src}
              src={src}
              alt={`Gym ${idx+1}`}
              style={{
                width: "100%",
                height: "300px",
                borderRadius: "12px",
                objectFit: "cover",
                animation: `slideUpFade 1s cubic-bezier(.4,1.4,.6,1) ${(idx*0.13)+0.1}s both`,
                boxShadow: "0 4px 18px rgba(0,0,0,0.10)",
                transition: "transform 0.3s cubic-bezier(.4,1.4,.6,1)",
                willChange: "transform, opacity"
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Common menu style
const menuStyle = {
  padding: "12px 20px",
  fontSize: "16px",
  color: "#fff",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  cursor: "pointer",
  borderBottom: "1px solid #333",
  transition: "background 0.2s",
};
