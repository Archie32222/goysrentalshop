import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Booking from './pages/BookingPage';
import InformationPage from './pages/informationPage';
import LoginPage from './pages/LoginPage';
// Import other pages as needed
// import Information from './pages/Information';
// import Contacts from './pages/Contacts';
// import Login from './pages/Login';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/information" element={<InformationPage />} />
        <Route path="/Login" element={<LoginPage />} />
        {/* Uncomment when ready */}
        {/* <Route path="/information" element={<Information />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/login" element={<Login />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
