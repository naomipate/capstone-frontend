// DEPENDENCIES
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Example from "./components/Example/Example";
import FriendsWishlist from "./components/FriendswishList/FriendsWishlist";
import NewList from "./components/AddNewList/AddNewList";
// COMPONENTS
//import Example from "./components/Example/Example";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/friendswishlist" element={<FriendsWishlist />} />
        <Route path="/create-list" element={<NewList />} />
      </Routes>
    </Router>
  );
}

export default App;
