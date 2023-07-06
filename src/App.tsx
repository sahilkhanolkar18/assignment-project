import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login-component";
import ForgotPassword from "./Components/Forgot-Password/Forgot-password-component";
import Details from "./Components/Details/Details-component";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
