import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css_files/create.css";

function Create() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // Retrieve the token

    try {
      const response = await axios.post(
        "http://localhost:5000/api/contact",
        { name, email, phone },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
    } catch (err) {
      console.error("Error:", err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="create-main">
      <h2>Create Contact</h2>
      <form
        onSubmit={(e) => {
          handleCreate(e);
          alert("Created Contact Successfully");
        }}
      >
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <button type="submit">Create</button> <br />
        <button
          type="button"
          onClick={() => {
            navigate("/");
          }}
        >
          Go To Home
        </button>
      </form>
    </div>
  );
}

export default Create;
