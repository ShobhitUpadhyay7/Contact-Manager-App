import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../css_files/delete.css";

const Delete = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);

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

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found! Redirecting to login.");
      navigate("/login");
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/contact/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      navigate("/"); // Redirect after successful deletion
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete contact");
    }
  };

  return (
    <div className="delete-main">
      <h1>Delete Contact</h1>
      {contact && (
        <div>
          <p>Are you sure you want to delete this contact?</p>
          <p>
            <strong>Name:</strong> {contact.name}
          </p>
          <p>
            <strong>Email:</strong> {contact.email}
          </p>
          <p>
            <strong>Phone:</strong> {contact.phone}
          </p>
          <button onClick={handleDelete} style={{ color: "red" }}>
            Confirm Delete
          </button>
          <button
            onClick={() => navigate("/")}
            style={{ marginLeft: "10px" }}
            className="cancel-btn"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default Delete;
