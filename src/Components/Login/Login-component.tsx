import React, { useState, useContext, FormEvent, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthToken } from "../../store/authReducer";

interface LoginResponse {
  authToken: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const requestBody = {
      email: email,
      password: password,
    };

    try {
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

      if (response.ok) {
        const data: LoginResponse = await response.json();
        console.log("Login successful:", data);
        dispatch(setAuthToken(data.authToken));
        navigate("/details");
      } else {
        console.error("Login failed:", response.status);
        setLoginError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("An error occurred during login. Please try again.");
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
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
            onChange={handleEmailChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 mb-4 border rounded-lg"
            value={password}
            onChange={handlePasswordChange}
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
