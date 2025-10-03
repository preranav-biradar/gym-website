import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Added

const gyms = [
  {
    id: "g1",
    image: "/g1.jpg",
    location: "Fitness Royal Gym, Wagholi",
    price: 100,
    desc: "Spacious gym with modern equipment and certified trainers.",
    map: "https://www.google.com/maps/place/Royal+Fitness+Gym/...",
  },
  {
    id: "g2",
    image: "/g2.jpg",
    location: "GET.FIT, Viman Nagar",
    price: 150,
    desc: "Premium fitness center with group classes and personal coaching.",
    map: "https://www.google.com/maps/place/A.C.O+Fitness/...",
  },
  {
    id: "g3",
    image: "/g3.jpg",
    location: "A.C.O FITNESS, Nagar",
    price: 200,
    desc: "Well-equipped gym with flexible timings and nutrition advice.",
    map: "https://www.google.com/maps/place/GET.FIT/...",
  },
  {
    id: "g4",
    image: "/g4.jpg",
    location: "Warrior Fitness, Handewadi",
    price: 100,
    desc: "Modern gym with cardio, weights, and yoga sessions.",
    map: "https://www.google.com/maps/place/WARRIOR+FITNESS+GYM/...",
  },
  {
    id: "g5",
    image: "/g5.jpg",
    location: "Regent Fitness",
    price: 120,
    desc: "Affordable gym with experienced trainers and clean facilities.",
    map: "https://www.google.com/maps/place/Regent+Fitness+Club/...",
  },
  {
    id: "g6",
    image: "/g6.jpg",
    location: "Trypod Fitness, Yewlewadi",
    price: 300,
    desc: "Friendly environment, latest machines, and group workouts.",
    map: "https://www.google.com/maps/place/Trypod+Fitness/...",
  },
];

export default function GymList() {
  const [bookedGyms, setBookedGyms] = useState({});
  const navigate = useNavigate(); // ✅ Initialize navigation

  // 📌 Handle Booking
  const handleBook = async (gym) => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("⚠️ Please log in first!");
        return;
      }

      const bookingData = {
        userId,
        gymId: gym.id,
        gymName: gym.location,
        price: gym.price,
        image: gym.image,
        date: new Date().toISOString(),
      };

      const res = await axios.post("http://localhost:5000/api/bookings", bookingData);

      if (res.status === 201) {
        alert(`✅ Booking Confirmed for ${gym.location}`);
        const bookingId = res.data.booking._id;

        // Store booking ID in state
        setBookedGyms((prev) => ({
          ...prev,
          [gym.id]: bookingId,
        }));

        // ✅ Redirect to payment page with booking details
        navigate("/dashboard/payment", {
          state: {
            bookingId,
            gymName: gym.location,
            price: gym.price,
            image: gym.image,
          },
        });
      } else {
        alert("⚠️ Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Failed to book. Check console for details.");
    }
  };

  // 📌 Handle Cancel Booking
  const handleCancel = async (gymId) => {
    try {
      const bookingId = bookedGyms[gymId];
      if (!bookingId) {
        alert("⚠️ No booking found to cancel.");
        return;
      }

      const res = await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`);

      if (res.status === 200) {
        alert("✅ Booking canceled successfully!");
        setBookedGyms((prev) => {
          const updated = { ...prev };
          delete updated[gymId];
          return updated;
        });
      } else {
        alert("⚠️ Failed to cancel booking. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error canceling booking. Check console for details.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(120deg, #232526 0%, #414345 100%)",
        padding: "40px 0",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: "32px",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        {gyms.map((gym) => {
          const isBooked = bookedGyms[gym.id];

          return (
            <div
              key={gym.id}
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                background: "#23272f",
                textAlign: "left",
                boxShadow: "0 2px 16px rgba(0,0,0,0.18)",
                transition: "transform 0.2s, box-shadow 0.2s",
                display: "flex",
                flexDirection: "column",
                minHeight: "420px",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-7px) scale(1.03)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
            >
              <img
                src={gym.image}
                alt={gym.location}
                style={{
                  width: "100%",
                  height: "230px",
                  objectFit: "cover",
                }}
              />
              <div
                style={{
                  padding: "18px 20px 16px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  flex: 1,
                }}
              >
                <h3
                  style={{
                    fontSize: "1.18rem",
                    fontWeight: 700,
                    margin: 0,
                    color: "green",
                  }}
                >
                  {gym.location}
                </h3>
                <p
                  style={{
                    fontSize: "0.93rem",
                    color: "white",
                    margin: "10px 0",
                    lineHeight: 1.5,
                  }}
                >
                  {gym.desc}
                </p>
                <div
                  style={{
                    fontSize: "0.89rem",
                    color: "#1976d2",
                    marginTop: "8px",
                  }}
                >
                  📍{" "}
                  <a
                    href={gym.map}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#1976d2",
                      textDecoration: "underline",
                    }}
                  >
                    View on Map
                  </a>
                </div>
                <div
                  style={{
                    fontWeight: 600,
                    color: "#ff5722",
                    fontSize: "1.05rem",
                    marginTop: "12px",
                  }}
                >
                  Price: ₹{gym.price} / day
                </div>

                {!isBooked ? (
                  <button
                    style={{
                      padding: "10px 0",
                      background:
                        "linear-gradient(90deg, #ff5722 0%, #ff9800 100%)",
                      color: "#fff",
                      border: "none",
                      borderRadius: "25px",
                      cursor: "pointer",
                      fontWeight: "600",
                      fontSize: "1rem",
                      marginTop: "18px",
                      width: "100%",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#e64a19")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background =
                        "linear-gradient(90deg, #ff5722 0%, #ff9800 100%)")
                    }
                    onClick={() => handleBook(gym)}
                  >
                    Book
                  </button>
                ) : (
                  <button
                    style={{
                      padding: "10px 0",
                      background: "linear-gradient(90deg, #d32f2f 0%, #f44336 100%)",
                      color: "#fff",
                      border: "none",
                      borderRadius: "25px",
                      cursor: "pointer",
                      fontWeight: "600",
                      fontSize: "1rem",
                      marginTop: "18px",
                      width: "100%",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#b71c1c")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background =
                        "linear-gradient(90deg, #d32f2f 0%, #f44336 100%)")
                    }
                    onClick={() => handleCancel(gym.id)}
                  >
                    Cancel Booking ❌
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
