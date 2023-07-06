import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    // Add your logic for handling the form submission here

    // Simulating email sent
    setIsEmailSent(true);
  };

  return (
    <div className="bg-gray-200 h-screen flex justify-center items-center">
      <div className="w-64 mx-auto bg-white rounded-lg shadow-md">
        <form onSubmit={handleOnSubmit} className="p-6">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Forgot Password
          </h1>
          <p className="text-sm mb-4">
            Enter your email address below, and we'll send you a link to reset
            your password.
          </p>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 mb-4 border rounded-lg"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg"
          >
            Reset Password
          </button>
          <Link to="/" className="block text-center mt-4 text-blue-500">
            Back to Login
          </Link>
          {isEmailSent && (
            <div className="bg-green-200 text-green-700 px-4 py-2 mt-4 rounded-lg text-center">
              Reset email sent. Please check your inbox.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
