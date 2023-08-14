import React, { useState } from 'react';

import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import TeamInfo from './components/TeamInfo';
import Games from './components/Games';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import './styles.css';
import Highlights from './components/highlights';
import Livescores from './components/livescores';
import Leagues from './components/leagues';
import AISearch from './components/searchAI';
function App() {
    
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <div className="search-container">
            
  
              
            </div>
           
            <Routes>
               <Route exact path="/" element={    <TeamInfo  />} />
              <Route exact path="/highlights" element={<Highlights/>} />
              <Route exact  path="/livescores" element={<Livescores/>} />
              <Route exact path="/standings" element={ <Leagues />} />
              <Route exact path="/Games" element={ <Games />} />
              <Route exact path="/Search" element={ <AISearch />} />
              {/* Add more routes for other components */}
            </Routes>
          
          </div>
        </div>
      </Router>
    );
  }

export default App;