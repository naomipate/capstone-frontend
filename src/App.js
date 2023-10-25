// DEPENDENCIES
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// COMPONENTS
import Example from './components/Example/Example';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Hello world!</h1>} />
      </Routes>
    </Router>
  )
}

export default App