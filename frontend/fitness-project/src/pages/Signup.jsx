import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaUserPlus, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        email,
        password,
      });

      alert(res.data.message || "Registration successful!");
      navigate("/login"); // ✅ redirect to login page
    } catch (err) {
      const errMsg = err.response?.data?.message || "Registration failed";
      alert(errMsg);
    }
  };

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
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <FaMapMarkerAlt size={20} color="#ff5555" />
          <span style={{ fontSize: "18px", fontWeight: "600" }}>Pune</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{ cursor: "pointer", fontSize: "18px", fontWeight: "600" }}
            onClick={() => navigate("/")}
          >
            Home
          </div>
          <div
            style={{ cursor: "pointer", fontSize: "18px", fontWeight: "600" }}
            onClick={() => navigate("/login")}
          >
            Login
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
          justifyContent: "center",
          background: "rgba(0,0,0,0.4)",
          padding: "40px 20px",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            padding: "40px 32px 32px 32px",
            borderRadius: "14px",
            background: "rgba(255,255,255,0.07)",
            border: "2px solid #fff",
            boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
            minWidth: "340px",
            maxWidth: "370px",
            width: "100%",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              color: "#ffae00",
              fontWeight: 800,
              fontSize: 32,
              marginBottom: 8,
            }}
          >
            Sign Up
          </h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "12px 14px",
              fontSize: "16px",
              borderRadius: "6px",
              border: "1.5px solid #ffae00",
              outline: "none",
              width: "100%",
              background: "#fff",
              color: "#232526",
              fontWeight: 500,
            }}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "12px 14px",
              fontSize: "16px",
              borderRadius: "6px",
              border: "1.5px solid #ffae00",
              outline: "none",
              width: "100%",
              background: "#fff",
              color: "#232526",
              fontWeight: 500,
            }}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{
              padding: "12px 14px",
              fontSize: "16px",
              borderRadius: "6px",
              border: "1.5px solid #ffae00",
              outline: "none",
              width: "100%",
              background: "#fff",
              color: "#232526",
              fontWeight: 500,
            }}
            required
          />

          <button
            type="submit"
            style={{
              padding: "12px 14px",
              fontSize: "16px",
              borderRadius: "6px",
              border: "none",
              background: "#28a745",
              color: "#fff",
              fontWeight: 700,
              cursor: "pointer",
              width: "100%",
              marginTop: 8,
              boxShadow: "0 2px 8px rgba(40,167,69,0.2)",
              letterSpacing: 1,
              transition: "background 0.2s",
            }}
          >
            Register
          </button>

          <p style={{ marginTop: "10px", color: "#ccc", fontSize: "15px" }}>
            Already have an account?{" "}
            <span
              style={{
                color: "#ffae00",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>

          <hr
            style={{
              width: "100%",
              margin: "5px 0 10px 0",
              border: "none",
              borderTop: "1.5px solid #eee",
            }}
          />

          <div style={{ textAlign: "center", width: "100%" }}>
            <span style={{ color: "#888", fontWeight: 500, fontSize: 15 }}>
              Connect with us:
            </span>
            <div
              style={{
                marginTop: 10,
                display: "flex",
                justifyContent: "center",
                gap: 18,
              }}
            >
              <a
                href="https://www.linkedin.com/in/prerana-biradar-a5643b267/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#0a66c2", fontSize: 28 }}
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/preranav-biradar"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#171515", fontSize: 28 }}
              >
                <FaGithub />
              </a>
              <a
                href="https://www.instagram.com/prerana.v.b/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#e4405f", fontSize: 28 }}
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </form>
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
    </div>
  );
}
