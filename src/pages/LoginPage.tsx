import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (login(email, password)) {
      navigate("/dashboard"); // Redirect to dashboard
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-pink-100">
      <div className="w-96 bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Log In</h1>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-3 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-between items-center mb-3">
          <label>
            <input type="checkbox" className="mr-2" />
            Remember Me
          </label>
          <Link to="#" className="text-red-500 hover:underline">
            Forgot Password?
          </Link>
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
