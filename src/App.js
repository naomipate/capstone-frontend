// DEPENDENCIES
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// COMPONENTS
import SignUpPage from "./components/SignUpPage/Signup";
import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
