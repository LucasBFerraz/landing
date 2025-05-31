import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Landing from './components/Landing'
import About from './components/About'

function App() {
  return (
    <div className="hero">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="scrollable-content">
        <Landing />
        {/* <About /> */}
      </div>
    </div>
  );
}

export default App;
