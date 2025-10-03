import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaUser, FaDumbbell } from "react-icons/fa";

export default function Gym() {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflowX = "hidden";
    document.documentElement.style.overflowX = "hidden";
    return () => {
      document.body.style.overflowX = "";
      document.documentElement.style.overflowX = "";
    };
  }, []);

  const handleUserClick = () => {
    navigate("/login");
  };

  // Array of 6 gym image URLs (replace with your own images in public folder)
  const images = [
    "/download (6).jpg",
    "/gym2.jpg",
    "/gym8.jpg",
    "/gym4.jpg",
    "/gym5 (1).jpg",
    "/gym5 (2).jpg",
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        overflowX: "hidden",
        background: "linear-gradient(120deg, #232526 0%, #414345 100%)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 40px",
          background: "rgba(0,0,0,0.5)",
        }}
      >
        {/* Location */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <FaMapMarkerAlt size={20} color="#ff5555" />
          <span style={{ fontSize: "18px", fontWeight: "600" }}>Pune</span>
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {/* Home link */}
          <div
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
            onClick={() => navigate("/")} // navigate to Home page
          >
            <span style={{ fontSize: "18px", fontWeight: "600" }}>Home</span>
          </div>

          {/* Gym Page Navigation */}
          <div
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
            onClick={() => navigate("/gym")}
          >
            <FaDumbbell size={20} />
            <span style={{ fontSize: "18px", fontWeight: "600" }}>Our Gym Gallery</span>
          </div>

          {/* User Icon with Login text */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              cursor: "pointer",
            }}
            onClick={handleUserClick}
            title="Go to Login"
          >
            <FaUser size={24} />
            <span style={{ fontSize: "18px", fontWeight: "600" }}>Login</span>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          background: "rgba(0,0,0,0.4)",
          padding: "40px 20px 60px 20px",
          borderRadius: "24px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
          margin: "40px 0"
        }}
      >
        {/* Quote */}
        <h2
          style={{
            fontSize: "2.2rem",
            fontWeight: "700",
            marginBottom: "32px",
            color: "#ffae00",
            letterSpacing: 1,
            textShadow: "0 2px 8px rgba(255,174,0,0.10)"
          }}
        >
          "Discipline is muscle behind every transformation."
        </h2>

        {/* Gym Images */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "32px",
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Gym ${index + 1}`}
              className="fadeInUp"
              style={{
                width: "100%",
                height: "260px",
                objectFit: "cover",
                borderRadius: "16px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                opacity: 0,
                animationDelay: `${(index + 1) * 0.18}s`,
                transition: "transform 0.3s cubic-bezier(.4,1.4,.6,1)",
              }}
            />
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer
        style={{
          background: "rgba(0,0,0,0.7)",
          textAlign: "center",
          padding: "15px",
          fontSize: "16px",
        }}
      >
        <a
          href="#"
          style={{
            color: "#ffae00",
            textDecoration: "none",
            fontWeight: "500",
          }}
        >
          Terms & Conditions
        </a>
      </footer>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px) scale(1.08); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .fadeInUp { animation: fadeInUp 0.8s cubic-bezier(.4,1.4,.6,1) both; }
      `}</style>
    </div>
  );
}
