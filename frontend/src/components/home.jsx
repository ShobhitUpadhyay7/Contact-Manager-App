import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { myContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import "../css_files/home.css";

const Home = () => {
  const { isLoggedIn } = useContext(myContext);
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.warn("No token found! User might be logged out.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/contact", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setContacts(response.data);
      } catch (err) {
        console.error(err.response?.data?.message || err.message);
      }
    };

    if (isLoggedIn !== undefined && isLoggedIn) {
      fetchContacts();
    }
  }, [isLoggedIn]); // Only fetch if `isLoggedIn` is defined

  return (
    <div className="home-main">
      <h1>Welcome to Home Page</h1>
      {isLoggedIn ? (
        <>
          <button onClick={() => navigate("/create")}>Add New Contact</button>
          <div>
            <h2>Contacts List</h2>
            {contacts.length === 0 ? (
              <p>No contacts found</p>
            ) : (
              <ul className="contact-list">
                {contacts.map((contact) => (
                  <li key={contact._id}>
                    {contact.name} - {contact.email} - {contact.phone}{" "}
                    <button onClick={() => navigate(`/update/${contact._id}`)}>
                      Edit
                    </button>{" "}
                    <button onClick={() => navigate(`/delete/${contact._id}`)}>
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      ) : (
        <>
          <p>Please log in first.</p>
          <br />
          <button onClick={() => navigate("/login")}>Go To Login</button>
        </>
      )}
    </div>
  );
};

export default Home;
