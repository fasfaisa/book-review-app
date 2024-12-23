import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddReview from './components/AddReview';
import View from './components/ReviewList';
import Edit from './pages/Edit';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddReview />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/view" element={<View />} />
        {/* <Route path="/edit/:id" element={<Edit />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
