// DEPENDENCIES
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FriendsWishlist from "./components/FriendswishList/FriendsWishlist";
import NewList from "./components/AddNewList/AddNewList";
// COMPONENTS
import SignUpPage from "./components/SignUpPage/Signup";
import SearchPage from "./components/SearchPage/SearchPage";
import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/search-page" element={<SearchPage/>} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/friendswishlist" element={<FriendsWishlist />} />
        <Route path="/create-list" element={<NewList />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
