import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/home";
import Create from "./components/createContact";
import Update from "./components/updateContact";
import Delete from "./components/deleteContact";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<Create />} />
      <Route path="/update/:id" element={<Update />} />
      <Route path="/delete/:id" element={<Delete />} />
    </Routes>
  );
}

export default App;
