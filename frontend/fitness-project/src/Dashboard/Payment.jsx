import React, { useState } from "react";
import { FaCheckCircle, FaCreditCard } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function Payment() {
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState(null);

  const { bookingId, gymName, image } = state || {};

  const plans = [
    { label: "1 Day", price: 100, offer: "Offer Zone", duration: "1 Day" },
    { label: "1 Month", price: 2500, offer: "Offer Zone", duration: "1 Month" },
    { label: "1 Year", price: 36000, offer: "Offer Zone", duration: "1 Year" },
  ];

  const handlePayClick = (plan) => setSelectedPlan(plan);

  const handlePayment = async () => {
    if (!selectedPlan) return alert("Select a plan first!");
    setLoading(true);
    try {
      const userId = localStorage.getItem("userId");
      const res = await axios.post("http://localhost:5000/api/payment/notify", {
        userId,
        bookingId,
        gymName,
        amount: selectedPlan.price,
        plan: selectedPlan.duration,
      });
      if (res.data.success) {
        setPaid(true);
        setPaymentInfo(res.data.payment);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Payment failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(120deg, #232526 0%, #414345 100%)",
        overflowX: "hidden",
        overflowY: "auto",
      }}
    >
      <style>{`
        body, html {
          overflow-x: hidden !important;
        }
        .pricing-header {
          background: #f57c20;
          color: #fff;
          padding: 18px 0 10px 0;
          border-radius: 18px 18px 0 0;
          font-size: 2rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-align: center;
          position: sticky;
          top: 0;
          z-index: 10;
        }
        
        .payment-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }
        .image-box {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          margin: 32px auto 18px auto;
        }
        .plan-row {
          display: flex;
          gap: 32px;
          justify-content: center;
          flex-wrap: wrap;
          margin: 24px 0;
          width: 100%;
        }
        .plan-card {
          background: #fff7e6;
          border-radius: 12px;
          box-shadow: 0 4px 16px rgba(245,124,32,0.10);
          padding: 28px 18px 18px 18px;
          min-width: 200px;
          max-width: 240px;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          border: 2.5px solid #f57c20;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .plan-card:hover {
          box-shadow: 0 8px 32px rgba(245,124,32,0.18);
          transform: translateY(-4px) scale(1.04);
        }
        .plan-title {
          background: #f57c20;
          color: #fff;
          font-weight: 700;
          font-size: 1.2rem;
          padding: 6px 18px;
          border-radius: 8px;
          margin-bottom: 6px;
        }
        .plan-price {
          font-size: 2rem;
          font-weight: bold;
          color: #d35400;
          margin: 8px 0;
        }
        .plan-detail {
          color: #333;
          font-size: 1rem;
          margin-bottom: 8px;
          text-align: center;
        }
        .plan-btn {
          background: linear-gradient(90deg, #f57c20 0%, #d35400 100%);
          color: #fff;
          padding: 12px 0;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          width: 90%;
          margin-top: 12px;
          box-shadow: 0 2px 8px rgba(245,124,32,0.12);
          transition: background 0.2s, transform 0.2s;
        }
        .plan-btn:hover {
          background: linear-gradient(90deg, #d35400 0%, #f57c20 100%);
          transform: scale(1.05);
        }
        @media (max-width: 900px) {
          .plan-row {
            flex-direction: column;
            gap: 24px;
            align-items: center;
          }
        }
      `}</style>

      <div
        style={{
          background: "#fff",
          borderRadius: "18px",
          width: "100%",
          maxWidth: "1500px",
          minHeight: "100vh",
          boxShadow: "0 8px 32px rgba(245,124,32,0.18)",
          overflowY: "auto",
        }}
      >
  <div className="pricing-header"><FaCreditCard style={{marginRight:8, verticalAlign:'middle'}}/> Membership Pricing Card</div>

        

        <div className="payment-content">
          <div className="image-box">
            <img
              src={image}
              alt={gymName}
              style={{
                width: "90%",
                maxWidth: "600px",
                height: "300px",
                objectFit: "cover",
                borderRadius: "12px",
                marginBottom: "10px",
                boxShadow: "0 2px 12px rgba(245,124,32,0.10)",
              }}
            />
          </div>
          <h3 style={{ color: "#d35400", fontWeight: 700, textAlign: "center" }}>{gymName}</h3>
          <p style={{ color: "#555", textAlign: "center" }}>
            Booking ID: <strong>{bookingId}</strong>
          </p>
        </div>

        {!selectedPlan && !paid && (
          <div className="plan-row">
            {plans.map((plan, idx) => (
              <div key={idx} className="plan-card">
                <div className="plan-title">{plan.label.toUpperCase()}</div>
                <div className="plan-detail">{plan.offer}</div>
                <div className="plan-detail">Duration: {plan.duration}</div>
                <div className="plan-price">₹{plan.price}</div>
                <button className="plan-btn" onClick={() => handlePayClick(plan)}>
                  Pay for {plan.label}
                </button>
              </div>
            ))}
          </div>
        )}

        {selectedPlan && !paid && (
          <div style={{ margin: "32px 0", textAlign: "center" }}>
            <h3 style={{ color: "#d35400", fontWeight: 700 }}>Selected: {selectedPlan.label}</h3>
            <p style={{ fontSize: "22px", fontWeight: "bold", color: "#d35400" }}>
              Amount: ₹{selectedPlan.price.toFixed(2)}
            </p>
            <button
              onClick={handlePayment}
              disabled={loading}
              className="plan-btn"
              style={{ width: "60%", marginTop: "18px" }}
            >
              {loading ? "Processing..." : "Pay Now"}
            </button>
          </div>
        )}

        {paid && (
          <div style={{ margin: "32px 0", textAlign: "center" }}>
            <FaCheckCircle size={48} color="#43cea2" />
            <h3 style={{ color: "#43cea2", fontWeight: 700 }}>Payment Successful!</h3>
            {paymentInfo && (
              <p>
                Payment ID: <strong>{paymentInfo._id}</strong>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
