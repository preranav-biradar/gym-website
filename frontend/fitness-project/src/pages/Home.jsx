import React from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaUser, FaDumbbell } from "react-icons/fa";

export default function Home() {
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate("/login");
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        overflowX: "hidden",
        backgroundImage: "url('/GYM DESIGN BY ACCESS DESIGN.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
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

        {/* Gym & User */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
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
        className="fadeInUp"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          background: "rgba(0,0,0,0.4)",
          padding: "40px 20px 60px 20px",
          borderRadius: "24px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
          margin: "40px 0"
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "800",
            maxWidth: "800px",
            margin: "0 auto",
            lineHeight: "1.3",
            color: "#ffae00",
            letterSpacing: 2,
            textShadow: "0 2px 8px rgba(255,174,0,0.10)"
          }}
        >
          "Push yourself because no one else is going to do it for you."
        </h1>
        <p
          style={{
            marginTop: "20px",
            fontSize: "1.3rem",
            fontWeight: "400",
            color: "#fff",
            textShadow: "0 2px 8px rgba(0,0,0,0.10)"
          }}
        >
          Join our fitness community and transform your lifestyle today.
        </p>
        <button
          style={{
            padding: "14px 38px",
            fontSize: "1.2rem",
            fontWeight: 700,
            background: "linear-gradient(90deg, #ff9800 0%, #ff5722 100%)",
            color: "#fff",
            border: "none",
            borderRadius: "30px",
            cursor: "pointer",
            boxShadow: "0 2px 12px rgba(255,152,0,0.10)",
            marginTop: "28px",
            transition: "background 0.2s"
          }}
          onClick={handleUserClick}
        >
          Get Started
        </button>
      </main>

      
        <div className="fadeInUp" style={{
          width: "370px",
          background: "#232526",
          borderRadius: "16px",
          boxShadow: "0 2px 16px rgba(0,0,0,0.10)",
          overflow: "hidden",
          color: "#fff",
          position: "relative",
          marginBottom: "24px"
        }}>
          
        </div>
        <div className="fadeInUp" style={{
          width: "370px",
          background: "#232526",
          borderRadius: "16px",
          boxShadow: "0 2px 16px rgba(0,0,0,0.10)",
          overflow: "hidden",
          color: "#fff",
          position: "relative",
          marginBottom: "24px"
        }}>
          
        </div>
      

      {/* PROFESSIONAL FOOTER with animation */}
      <footer className="footerFade" style={{ background: "#232526", color: "#fff", padding: "40px 0 0 0", marginTop: 0 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "32px", padding: "0 32px" }}>
          <div>
            <h3 style={{ fontWeight: 700, marginBottom: "12px" }}>ABOUT US</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li>Company background</li>
              <li>Careers</li>
              <li>Press room</li>
              <li>Reviews & Testimonials</li>
            </ul>
          </div>
          <div>
            <h3 style={{ fontWeight: 700, marginBottom: "12px" }}>MEMBERSHIP</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li>Membership options</li>
              <li>Membership benefits</li>
              <li>Corporate membership</li>
              <li>Frequently asked questions</li>
            </ul>
          </div>
          <div>
            <h3 style={{ fontWeight: 700, marginBottom: "12px" }}>CLUBS</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li>Club finder</li>
              <li>Club operating hours</li>
              <li>Get 1 Day Free Pass</li>
              <li>Club Facilities</li>
            </ul>
          </div>
          <div>
            <h3 style={{ fontWeight: 700, marginBottom: "12px" }}>POLICIES & LEGAL</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li>Privacy policy</li>
              <li>Terms & Conditions - Website</li>
              <li>Terms & Conditions - Members</li>
              <li>Labour Compliance Documents</li>
            </ul>
          </div>
          <div>
            <h3 style={{ fontWeight: 700, marginBottom: "12px" }}>CUSTOMER SERVICE</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li>Members' Area</li>
              <li>FAQs</li>
              <li>Contact us</li>
              <li>Membership Enquiry</li>
            </ul>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "32px", paddingBottom: "18px" }}>
          
         
        </div>
      </footer>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px) scale(1.08); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .fadeInUp { animation: fadeInUp 1.1s cubic-bezier(.4,1.4,.6,1) both; }
        @keyframes footerFade {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .footerFade { animation: footerFade 1.2s cubic-bezier(.4,1.4,.6,1) both; }
      `}</style>
    </div>
  );
}
