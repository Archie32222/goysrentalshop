import React, { useState } from "react";
import { loginUser } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { checkAdminStatus } from "../lib/supabase";
import { supabase } from "../lib/supabase";
import HeaderNav from "../components/HeaderNav";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // First authenticate the user
      const result = await loginUser(loginEmail, loginPassword);

      if (result.error) {
        setError(result.error);
        setIsLoading(false);
        return;
      }

      // Check if the user is an admin
      const { isAdmin, error: adminCheckError } = await checkAdminStatus(
        loginEmail
      );

      if (adminCheckError) {
        setError("Error verifying admin status. Please try again.");
        // Sign out the user if they're not an admin
        await supabase.auth.signOut();
        setIsLoading(false);
        return;
      }

      if (!isAdmin) {
        setError("Access denied. This login is for administrators only.");
        // Sign out the user if they're not an admin
        await supabase.auth.signOut();
        setIsLoading(false);
        return;
      }

      // Admin login successful
      navigate("/admin");
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Admin login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 flex items-center justify-center min-h-screen">
      <div className="bg-gray-800 p-8 rounded shadow-lg w-full max-w-md text-white">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Admin Portal</h1>
          <p className="text-gray-400 mt-2">
            Restricted access for authorized personnel only
          </p>
        </div>

        {error && (
          <div className="bg-red-800 text-white p-4 rounded-md mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-300 mb-2">
              Admin Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your admin email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className="w-full mb-4 px-4 py-2 border rounded bg-gray-700 text-white border-gray-600"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-300 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full mb-2 px-4 py-2 border rounded bg-gray-700 text-white border-gray-600"
              required
            />
            <div className="text-right">
              <a href="#" className="text-sm text-blue-400 hover:text-blue-300">
                Forgot password?
              </a>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 font-medium ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Verifying..." : "Login as Administrator"}
          </button>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-gray-400 hover:text-gray-300"
            >
              Return to main site
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
