// DEPENDENCIES
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Example from "./components/Example/Example";

// COMPONENTS
// import Example from "./components/Example/Example";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Friends wish list</h1>} />
        <Route path="/example" element={<Example />} />
      </Routes>
    </Router>
  );
}

export default App;
