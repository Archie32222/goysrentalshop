import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import images from "../constant/image";
import { supabase } from "../lib/supabase";

const AdminHeader = ({ userName }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      localStorage.removeItem("userSession");
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2">
            <img src={images.logo} alt="Logo" className="h-8 w-auto" />
            <div>
              <Link to="/admin" className="text-xl font-bold text-white">
                Admin Dashboard
              </Link>
              <p className="text-xs text-gray-400">
                Goy's Car Rental Management
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/admin"
              className="text-gray-300 hover:text-white transition duration-150"
            >
              Dashboard
            </Link>
            <Link
              to="/"
              className="text-gray-300 hover:text-white transition duration-150"
              target="_blank"
            >
              View Site
            </Link>

            {/* Admin user dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium">{userName || "Admin"}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg py-1 z-20">
                  <Link
                    to="/admin/settings"
                    className="block px-4 py-2 text-sm hover:bg-gray-600 w-full text-left"
                  >
                    Admin Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-red-400 hover:bg-gray-600 w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Admin Sub-Navigation */}
      <div className="bg-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex space-x-6 overflow-x-auto whitespace-nowrap py-2">
            <Link
              to="/admin"
              className="text-sm text-gray-300 hover:text-white transition duration-150"
            >
              Overview
            </Link>
            <Link
              to="/admin?tab=users"
              className="text-sm text-gray-300 hover:text-white transition duration-150"
            >
              Users
            </Link>
            <Link
              to="/admin?tab=bookings"
              className="text-sm text-gray-300 hover:text-white transition duration-150"
            >
              Bookings
            </Link>
            <Link
              to="/admin?tab=cars"
              className="text-sm text-gray-300 hover:text-white transition duration-150"
            >
              Vehicles
            </Link>
            <Link
              to="/admin?tab=reports"
              className="text-sm text-gray-300 hover:text-white transition duration-150"
            >
              Reports
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
