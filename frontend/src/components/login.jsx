import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { myContext } from "../context/context";
import "../css_files/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { isLoggedIn, setIsLoggedIn } = useContext(myContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Logined:", response.data);

      const token = response.data.accessToken;
      if (token) {
        localStorage.setItem("token", token); // Store token
        setIsLoggedIn(true);
        navigate("/")
      }

      console.log(localStorage.getItem("token"));

      // setIsLoggedIn(true);
    } catch (err) {
      console.error("Error:", err.response?.data?.message || err.message);
    }
  };

  // useEffect(() => {
  //   console.log("isLoggedIn status changed:", isLoggedIn);
  //   const token = localStorage.getItem("token");
  //   if (isLoggedIn) {
  //     navigate("/home");
  //   }
  // }, [isLoggedIn, navigate]);
  

  return (
    <div className="login-main">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button> <b>OR</b>{" "}
        <button type="button"
          onClick={() => {
            navigate("/register");
          }}
        >
          Go to Registration
        </button>
      </form>
    </div>
  );
}

export default Login;
