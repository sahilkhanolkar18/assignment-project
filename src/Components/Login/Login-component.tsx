import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // Create the request body
    const requestBody = {
      email: email,
      password: password,
    };

    try {
      // Send the POST request
      const response = await fetch(
        "https://x8ki-letl-twmt.n7.xano.io/api:XooRuQbs/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      // Check if the request was successful
      if (response.ok) {
        // Process the response
        const data = await response.json();
        console.log("Login successful:", data);
        // Handle successful login, e.g., redirect to another page
      } else {
        // Handle error response
        console.error("Login failed:", response.status);
        setLoginError("Login failed. Please check your credentials."); // Set login error message
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("An error occurred during login. Please try again."); // Set login error message
      // Handle any network or other errors
    }
  };

  return (
    <div className="bg-gray-200 h-screen">
      <div className="flex justify-center items-center h-full border-2 border-gray-400">
        <form
          onSubmit={handleOnSubmit}
          className="w-64 mx-auto mt-10 border rounded-lg p-6"
        >
          <h1 className="text-2xl font-bold mb-4 text-center">LOGIN</h1>

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 mb-4 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 mb-4 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link to="/forgot-password" className="text-blue-500">
            Forgot Password
          </Link>
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg"
          >
            Log In
          </button>
          {loginError && (
            <div className="bg-red-200 text-red-700 px-4 py-2 mb-4 mt-4 rounded-lg text-center">
              {loginError}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
