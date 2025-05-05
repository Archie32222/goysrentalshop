import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LandingPage from "./pages/LandingPage";
import Booking from "./pages/BookingPage";
import InformationPage from "./pages/informationPage";
import LoginPage from "./pages/LoginPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AccountVerifyPage from "./pages/AccountVerifyPage";
import ContactPage from "./pages/ContactPage";
import AdminPage from "./pages/AdminPage";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/information" element={<InformationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route path="/verify" element={<AccountVerifyPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
