// DEPENDENCIES
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from "./components/SearchPage/Search";

// COMPONENTS
//import Example from "./components/Example/Example";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Hello World!</h1>} />
        <Route path="/search-page" element={<Search/>} />
      </Routes>
    </Router>
  );
}

export default App;
