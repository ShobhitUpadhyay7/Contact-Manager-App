import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css_files/register.css";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/register",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Registered:", response.data);
    } catch (err) {
      console.error("Error:", err.response?.data?.message || err.message);
    }
  };
  return (
    <div className="register-main">
      <h1>Register User</h1>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
          alert("Registered User Successfully");
        }}
      >
        <div>
          <label>Email:</label>
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="register">
          <label>Password:</label>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register</button> <b>OR</b>{" "}
        <button type="button" onClick={() => navigate("/login")}>Go to Login</button>
      </form>
    </div>
  );
}

export default Register;
