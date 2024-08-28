import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VirtualScroll from './components/VirtualScroll';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VirtualScroll />} />
      </Routes>
    </Router>
  );
}

export default App;