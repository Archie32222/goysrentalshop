import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const AccountVerifyPage = () => {
  const [verificationState, setVerificationState] = useState("loading");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Get the hash fragments from the URL
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);

    // Supabase puts the verification token in the URL as a hash fragment
    const type = params.get("type");
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");

    const verifyAccount = async () => {
      try {
        // Check if this is a confirmation flow
        if (type === "signup" && accessToken) {
          // Set the session using the tokens received
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (error) {
            throw error;
          }

          // If no error, verification was successful
          setVerificationState("success");
        } else {
          // If not a signup confirmation, it might be another auth flow
          setVerificationState("invalid");
        }
      } catch (err) {
        console.error("Verification error:", err);
        setError(err.message);
        setVerificationState("error");
      }
    };

    verifyAccount();
  }, [navigate]);

  // Different UI states based on verification status
  const renderContent = () => {
    switch (verificationState) {
      case "loading":
        return (
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-6"></div>
            <h2 className="text-2xl font-semibold mb-2">
              Verifying Your Account
            </h2>
            <p className="text-gray-400">
              Just a moment while we confirm your registration...
            </p>
          </div>
        );

      case "success":
        return (
          <div className="text-center">
            <div className="bg-green-900 p-4 rounded-full inline-flex mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-2">
              Account Verification Successful!
            </h2>
            <p className="text-gray-400 mb-6">
              Your email has been verified. You can now log in to your account.
            </p>
            <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-3 justify-center">
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-600 hover:bg-blue-700 py-2 px-6 rounded-md font-medium"
              >
                Log In Now
              </button>
              <button
                onClick={() => window.close()}
                className="bg-gray-700 hover:bg-gray-600 py-2 px-6 rounded-md font-medium"
              >
                Close This Tab
              </button>
            </div>
          </div>
        );

      case "error":
        return (
          <div className="text-center">
            <div className="bg-red-900 p-4 rounded-full inline-flex mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-2">Verification Failed</h2>
            <p className="text-red-400 mb-2">
              {error || "We couldn't verify your account."}
            </p>
            <p className="text-gray-400 mb-6">
              This link may have expired or is invalid. Please try registering
              again.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 hover:bg-blue-700 py-2 px-6 rounded-md font-medium"
            >
              Back to Login
            </button>
          </div>
        );

      case "invalid":
        return (
          <div className="text-center">
            <div className="bg-yellow-900 p-4 rounded-full inline-flex mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-yellow-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-2">
              Invalid Verification Link
            </h2>
            <p className="text-gray-400 mb-6">
              This doesn't appear to be a valid account verification link.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 hover:bg-blue-700 py-2 px-6 rounded-md font-medium"
            >
              Back to Login
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">
          Goy's Car Rental
        </h1>
        {renderContent()}
      </div>
    </div>
  );
};

export default AccountVerifyPage;
