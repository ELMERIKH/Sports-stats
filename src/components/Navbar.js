import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/foot.png';


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__container">
      <Link to="/">   <img src={logo} alt="Foot" className="app-bar__image" />  </Link>
        <h1 className="navbar__logo">Foot Stats</h1>
        <div className="navbar__items">
          <Link to="/highlights" className="navbar__item">
            <button className="btn" style={{ color: 'white' }}>Highlights</button>
          </Link>
          <Link to="/livescores" className="navbar__item">
            <button className="btn" style={{ color: 'white' }}>Livescores</button>
          </Link>
          <Link to="/standings" className="navbar__item">
            <button className="btn" style={{ color: 'white' }}>Standings</button>
          </Link>
          <Link to="/games" className="navbar__item">
            <button className="btn" style={{ color: 'white' }}>Games</button>
          </Link>
          <Link to="/Search" className="navbar__item">
            <button className="btn" style={{ color: 'white' }}>SearchAI</button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;