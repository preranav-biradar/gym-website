import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Gym from "./pages/Gym";
import Dashboard from "./pages/Dashboard";
import Gymlisting from "./Dashboard/Gymlisting";
import BookTrainer from "./Dashboard/BookTrainer";
import Payment from "./Dashboard/Payment";

import Review from "./Dashboard/Review";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/gym" element={<Gym />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/gymlisting" element={<Gymlisting />} />
        <Route path="/dashboard/booktrainer" element={<BookTrainer/>}/>
        <Route path ="/dashboard/payment" element={<Payment/>}/>      

<Route path="/dashboard/review" element={<Review />} />
      </Routes>
    </Router>
  );
}
