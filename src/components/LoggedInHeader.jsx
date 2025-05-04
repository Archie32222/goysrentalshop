import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import images from "../constant/image";
import { supabase } from "../lib/supabase";
import { checkAdminStatus } from "../lib/supabase";

const LoggedInHeader = ({ userName }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      if (userName) {
        const { isAdmin } = await checkAdminStatus(userName);
        setIsAdmin(isAdmin);
      }
    };

    checkAdmin();
  }, [userName]);

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
    <header className="flex justify-between items-center p-6 bg-black bg-opacity-70">
      <div className="text-xl font-bold flex items-center gap-2">
        <img src={images.logo} alt="Logo" className="h-8 w-auto" />
        <Link to="/">Goy's Car Rental Services</Link>
      </div>

      <nav className="hidden md:flex items-center space-x-6">
        <Link to="/" className="hover:text-blue-400 transition-colors">
          Home
        </Link>
        <Link to="/booking" className="hover:text-blue-400 transition-colors">
          Book a Car
        </Link>
        <Link
          to="/information"
          className="hover:text-blue-400 transition-colors"
        >
          Information
        </Link>
        <Link to="/contact" className="hover:text-blue-400 transition-colors">
          Contact
        </Link>

        {isAdmin && (
          <Link
            to="/admin"
            className="hover:text-blue-400 transition-colors font-semibold text-yellow-400"
          >
            Admin
          </Link>
        )}

        {/* User profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full transition-colors"
          >
            <span className="font-medium">{userName || "User"}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-10">
              <Link
                to="/my-account"
                className="block px-4 py-2 text-sm hover:bg-gray-700 w-full text-left"
              >
                My Account
              </Link>
              <Link
                to="/my-bookings"
                className="block px-4 py-2 text-sm hover:bg-gray-700 w-full text-left"
              >
                My Bookings
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="block px-4 py-2 text-sm text-yellow-400 hover:bg-gray-700 w-full text-left"
                >
                  Admin Dashboard
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="block px-4 py-2 text-sm text-red-400 hover:bg-gray-700 w-full text-left"
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
    </header>
  );
};

export default LoggedInHeader;
