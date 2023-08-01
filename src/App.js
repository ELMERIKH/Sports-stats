import React from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import TeamInfo from './components/TeamInfo';
import Highlight from './components/highlights'; // Import the Highlight component
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import './styles.css';
import Highlights from './components/highlights';
import Livescores from './components/livescores';
function App() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <div className="search-container">
              <SearchBar />
            </div>
            <Routes>
              <Route exact path="/highlights" element={<Highlights/>} />
              <Route exact path="/livescores" element={<Livescores/>} />
              {/* Add more routes for other components */}
            </Routes>
          
          </div>
        </div>
      </Router>
    );
  }

export default App;