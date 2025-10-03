import { FaMapMarkerAlt, FaUser, FaDumbbell, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.body.style.overflowX = "hidden";
    document.documentElement.style.overflowX = "hidden";
    return () => {
      document.body.style.overflowX = "";
      document.documentElement.style.overflowX = "";
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      // Try logging in
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });

      // ✅ Login successful
      alert(res.data.message);
      localStorage.setItem("userId", res.data.user._id);
      navigate("/dashboard");
    } catch (err) {
      const errMsg = err.response?.data?.message || "Login failed";

      if (errMsg === "User not found") {
        // ✅ Ask to sign up
        const confirmSignup = window.confirm(
          "No account found with this email. Would you like to sign up?"
        );
        if (confirmSignup) {
          navigate("/signup"); // redirect to signup page
        }
      } else if (errMsg === "Invalid password") {
        alert("Incorrect password. Please try again.");
      } else {
        alert(errMsg);
      }
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
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
            onClick={() => navigate("/gym")}
          >
            <FaDumbbell size={20} />
            <span style={{ fontSize: "18px", fontWeight: "600" }}>
              Our Gym Gallery
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/login")}
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
            gap: "22px",
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
            Login
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
              marginBottom: 2,
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
              marginBottom: 2,
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
              background: "#007bff",
              color: "#fff",
              fontWeight: 700,
              cursor: "pointer",
              width: "100%",
              marginTop: 8,
              boxShadow: "0 2px 8px rgba(0,123,255,0.10)",
              letterSpacing: 1,
              transition: "background 0.2s",
            }}
          >
            Login
          </button>

          {/* 👇 Add signup link here too */}
          <p style={{ marginTop: "10px", color: "#ccc", fontSize: "15px" }}>
            Don't have an account?{" "}
            <span
              style={{
                color: "#ffae00",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => navigate("/signup")}
            >
              Sign up
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
                marginTop: 8,
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
