// DEPENDENCIES
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// COMPONENTS
//import Example from "./components/Example/Example";
import SignUpPage from "./components/SignUpPage/Signup";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Hello World!</h1>} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
}

export default App;
