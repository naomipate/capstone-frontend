// DEPENDENCIES
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import FriendsWishlist from "./components/FriendswishList/FriendsWishlist";
import NewList from "./components/AddNewList/AddNewList";
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
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/friendswishlist" element={<FriendsWishlist />} />
        <Route path="/create-list" element={<NewList />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
