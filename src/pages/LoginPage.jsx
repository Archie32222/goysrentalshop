import React, { useState } from "react";
import { loginUser, registerUser } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Registration state
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [contact, setContact] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await loginUser(loginEmail, loginPassword);
      if (result.error) {
        setError(result.error);
      } else if (result.user) {
        navigate("/booking");
      }
    } catch (err) {
      setError("An error occurred during login");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { user, error } = await registerUser(
        registerEmail,
        registerPassword,
        fullName,
        contact
      );

      if (error) {
        setError(error);
        console.error("Signup error:", error);
      } else {
        console.log("User signed up:", user);
        alert("Signup successful! Please check your email to confirm.");
        setActiveTab("login");
        // Reset form
        setRegisterEmail("");
        setRegisterPassword("");
        setFullName("");
        setContact("");
      }
    } catch (err) {
      setError("An error occurred during registration");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 flex items-center justify-center min-h-screen text-black">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        {/* Tabs */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setActiveTab("login")}
            className={`font-bold border-b-2 ${
              activeTab === "login"
                ? "text-black border-black"
                : "text-gray-600 border-transparent"
            }`}
          >
            LOGIN
          </button>
          <button
            onClick={() => setActiveTab("register")}
            className={`font-bold border-b-2 ${
              activeTab === "register"
                ? "text-black border-black"
                : "text-gray-600 border-transparent"
            }`}
          >
            REGISTER
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Login Form */}
        {activeTab === "login" && (
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className="w-full mb-4 px-4 py-2 border rounded"
              required
            />
            <input
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              placeholder="Password"
              className="w-full mb-6 px-4 py-2 border rounded"
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Logging in..." : "LOGIN"}
            </button>
          </form>
        )}

        {/* Register Form */}
        {activeTab === "register" && (
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full mb-4 px-4 py-2 border rounded"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-4 px-4 py-2 border rounded"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Contact Number"
              className="w-full mb-4 px-4 py-2 border rounded"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full mb-6 px-4 py-2 border rounded"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Creating Account..." : "REGISTER"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
