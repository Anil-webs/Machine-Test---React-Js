import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import MovieDetails from './movie/MovieDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <h2 className='MovieDB'>MovieDB</h2>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
