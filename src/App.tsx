import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

function App() {
  const Login = () => {
    const handleOnSubmit = (e) => {
      e.preventDefault();
    };

    return (
      <form onSubmit={handleOnSubmit} className="w-64 mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">Login page</h1>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full px-4 py-2 mb-4 border rounded-lg"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full px-4 py-2 mb-4 border rounded-lg"
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
      </form>
    );
  };

  const ForgotPassword = () => {
    return (
      <div>
        <h1>Forgot Password Page</h1>
      </div>
    );
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/forgot-password" Component={ForgotPassword} />
      </Routes>
    </div>
  );
}

export default App;
