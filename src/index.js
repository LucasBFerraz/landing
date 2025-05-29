import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter, Routes, Route } from 'react-router-dom'; // changed to HashRouter
import About from './components/About';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <Routes>
      <Route index element={<App />} />
      <Route path="about" element={<About />} />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  </HashRouter>
);

reportWebVitals();