// DEPENDENCIES
import React, { useEffect, useState } from "react";
// import Axios from "./components/API/Axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
// import FriendsWishlist from "./components/FriendswishList/FriendsWishlist";
import UserWishlist from "./components/UserWishlist/UserWishlist";
import AddWishlist from "./components/AddWishlist/AddWishlist";
import EditWishlist from "./components/EditWishlist/EditWishlist";

// COMPONENTS
import SignUpPage from "./components/SignUpPage/Signup";
import SearchPage from "./components/SearchPage/SearchPage";
import Nav from "./components/Nav/Nav";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import FriendList from "./components/FriendList/FriendList";
import FriendsProfile from "./components/FriendsProfile/FriendsProfile";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let userFromStorage = localStorage.getItem("user");
    let storedUser = JSON.parse(userFromStorage);
    setUser(storedUser);
  }, []);

  // console.log(user);
  return (
    <Router>
      <Nav />
      <main className={user ? "page-content" : ""}>
        {user && <Sidebar />}
        <Routes>
          <Route path="/search-page" element={<SearchPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          {/* <Route path="/friendswishlist" element={<FriendsWishlist />} /> */}
          <Route
            path="/dashboard/:id/new"
            element={<AddWishlist user={user} />}
          />
          <Route
            path="/dashboard/:id/userwishlist"
            element={<UserWishlist user={user} />}
          />
          <Route path="/dashboard/:id/edit" element={<EditWishlist />} />
          <Route path="/dashboard/:id" element={<Dashboard user={user} />} />
          <Route path="/dashboard/:id/friends" element={<FriendList />} />
          <Route
            path="/dashboard/:id/friends/:friendId"
            element={<FriendsProfile />}
          />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
