// DEPENDENCIES
import React, { useEffect, useState } from "react";
import Axios from "./components/API/Axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
  useNavigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import FriendsWishlist from "./components/FriendswishList/FriendsWishlist";
import UserWishlist from "./components/UserWishlist/UserWishlist";
import NewWishlist from "./components/AddNewWishlist/AddNewWishlist";
// COMPONENTS
import SignUpPage from "./components/SignUpPage/Signup";
import SearchPage from "./components/SearchPage/SearchPage";
import Nav from "./components/Nav/Nav";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";

function App() {
  return (
    <Router>
      <Nav />
      <Sidebar />
      <Routes>
        <Route path="/search-page" element={<SearchPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/:id" element={<Dashboard />} />
        <Route path="/friendswishlist" element={<FriendsWishlist />} />
        <Route path="/userwishlist" element={<UserWishlist />} />
        <Route path="/create-wishlist" element={<NewWishlist />} />
        <Route path="/edit-wishlist" element={<EditWishlist />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
