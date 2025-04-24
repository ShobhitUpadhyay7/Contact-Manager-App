import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../css_files/update.css";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    const fetchContact = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No token found! Redirecting to login.");
        navigate("/login");
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:5000/api/contact/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setContact(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch contact");
      }
    };
    fetchContact();
  }, [id, navigate]);

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found! Redirecting to login.");
      navigate("/login");
      return;
    }
    try {
      await axios.put(`http://localhost:5000/api/contact/${id}`, contact, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update contact");
    }
  };

  return (
    <div className="update-main">
      <h1>Update Contact</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={contact.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={contact.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={contact.phone}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Update Contact</button>
        <button
          onClick={() => navigate("/")}
          style={{ marginLeft: "10px" }}
          className="cancel-btn"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Update;
