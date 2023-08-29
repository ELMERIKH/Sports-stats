import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/foot.png';


const BNavbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__container">
      <Link to="/">   <img src={logo} alt="Foot" className="app-bar__image" />  </Link>
        <h1 className="navbar__logo">Foot Stats</h1>
        <div className="navbar__items">
        
          <Link to="/basket-ball/standings" className="navbar__item">
            <button className="btn" style={{ color: 'white' }}>Standings</button>
          </Link>
          <Link to="/Basket-ball/games" className="navbar__item">
            <button className="btn" style={{ color: 'white' }}>Games</button>
          </Link>
          <Link to="/Basket-ball/Search" className="navbar__item">
            <button className="btn" style={{ color: 'white' }}>SearchAI</button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default BNavbar;