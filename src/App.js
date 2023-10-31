// DEPENDENCIES
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// COMPONENTS
//import Example from "./components/Example/Example";
import Login from "./components/Example/Login/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<h1>Hello World!</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
