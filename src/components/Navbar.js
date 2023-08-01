import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/foot.jpg';
import Highlights from './highlights';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <img src={logo} alt="Foot" className="app-bar__image" />
        <h1 className="navbar__logo">Football Website</h1>
        <div className="navbar__items">
          <Link to="/highlights" className="navbar__item">
            <button className="btn" style={{ color: 'white' }}>Highlights</button>
          </Link>
          <Link to="/livescores" className="navbar__item">
            <button className="btn" style={{ color: 'white' }}>Livescores</button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;