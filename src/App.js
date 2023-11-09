// DEPENDENCIES
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// COMPONENTS
import SignUpPage from "./components/SignUpPage/Signup";
import SearchPage from "./components/SearchPage/SearchPage";
import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import FriendList from "./components/FriendList/FriendList";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/search-page" element={<SearchPage/>} />
      <Route path="/users/:id/friends" element={<FriendList/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
