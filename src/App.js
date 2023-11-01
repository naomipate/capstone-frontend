// DEPENDENCIES
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Example from "./components/Example/Example";
import FriendsWishlist from "./components/FriendswishList/FriendsWishlist";

// COMPONENTS
//import Example from "./components/Example/Example";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Hello World!</h1>} />
        <Route path="/example" element={<Example />} />
        <Route path="/friendswishlist" element={<FriendsWishlist />} />
        <Route path="/example/:id" element={<FriendsWishlist />} />
      </Routes>
    </Router>
  );
}

export default App;
