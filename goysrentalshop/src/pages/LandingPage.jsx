import React from "react";
import HeaderNav from "../components/HeaderNav";
import images from "../constant/image";
import { Link  } from 'react-router-dom';

const LandingPage = () => {

  return (
    <div className="bg-gray-900 text-white">
      <HeaderNav />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <img
          src={images.landingBackground}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover z-10"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        {/* Content */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-5xl font-bold mb-4">
            Safe and Relaxing Trip
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Need an affordable car? We've got you covered!
            <br />
            Book now and get amazing deals from P1,800/day with unlimited
            mileage on selected destinations!
          </p>
          <Link to="/login" className="bg-white text-black px-6 py-3 rounded hover:bg-gray-200 font-semibold transition">Book Now</Link>

        </div>
      </section>
    </div>
  );
};

export default LandingPage;
