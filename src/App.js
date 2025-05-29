import './App.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './components/About';
import Navbar from './components/Navbar'
import Landing from './components/Landing'

function App() {
  return (
    <div className="hero">
      <Navbar />
      <Landing />
    </div>
  );
}

export default App;
