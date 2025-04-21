import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/Background/Goysrentalshop.jpg';
import HeaderNav from '../components/HeaderNav';

const InformationPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Navbar */}
      <HeaderNav/>
      {/* Main Content */}
      <section className="px-6 py-16 max-w-4xl mx-auto space-y-12">
        <div>
          <h2 className="text-3xl font-bold mb-4">About Goy's Car Rental</h2>
          <p className="text-gray-300">
            Goy’s Car Rental Services is your trusted partner for affordable and reliable transportation.
            Whether you're going on a road trip, a business trip, or just need a car for a few days, we offer a range of vehicles to suit your needs.
            Our goal is to make car rental simple, fast, and stress-free.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Select your pickup and return dates</li>
            <li>Browse our fleet and choose your car</li>
            <li>Complete the booking form and submit</li>
            <li>Pick up your car and enjoy your trip!</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Affordable daily rates (from P1,800/day)</li>
            <li>Unlimited mileage on select cars</li>
            <li>Clean, well-maintained vehicles</li>
            <li>Fast and friendly service</li>
            <li>Flexible pickup and return options</li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-400 bg-black bg-opacity-80">
        &copy; 2025 Goy's Car Rental Services. All rights reserved.
      </footer>
    </div>
  );
};

export default InformationPage;
