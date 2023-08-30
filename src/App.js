import React, { useState } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import TeamInfo from './components/TeamInfo';
import Games from './components/Games';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles.css';
import Highlights from './components/highlights';
import Livescores from './components/livescores';
import Leagues from './components/leagues';
import AISearch from './components/searchAI';
import BLeagues from './components/Bleagues';
import PlayerList from './components/basketsearch';
import BGames from './components/BGames';
import Bhighlights from './components/Bhighlights';
function App() {

  return (
    <Router>
      <div className="App">
         <Navbar />
        <div className="container">
          <div className="search-container">
            {/* Add your search bar component here */}
          </div>

          <Routes>
            <Route
              exact
              path="/"
              element={<TeamInfo  />}
            /> <Route
            exact
            path="/Basket-Ball/"
            element={<PlayerList  />}
          />
            <Route exact path="/highlights" element={<Highlights />} />
            <Route exact path="/livescores" element={<Livescores />} />
            <Route exact path="/standings" element={<Leagues />} />
            <Route exact path="/Games" element={<Games />} />
            <Route exact path="/Search" element={<AISearch />} />
            <Route
              exact 
              path="/Basket-Ball/standings"
              element={<BLeagues   />} 
            />
            <Route exact path="/Basket-Ball/Games" element={<BGames />} />
            <Route exact path="/basket-ball/highlights" element={<Bhighlights />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;