import React ,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/foot.png';
import basket from'../assets/img/basket.png';

function Navbar() {
const [showBnavbar, setShowBnavbar] = useState(true);

const handleBLeaguesClick = () => {
  setShowBnavbar(false);
};

const handleFLeaguesClick = () => {
  setShowBnavbar(true);
};
console.log(showBnavbar)
useEffect(() => {
  document.body.style.background = showBnavbar
    ? 'linear-gradient(-45deg, #02085e, #08007c, #0b0949, #0b0380)'
    : 'linear-gradient(-45deg, #5e3302, #c7a304, #7e4c02, #aa5403)';
    document.body.style.backgroundSize = '400% 400%';
  document.body.style.animation = 'gradient 15s ease infinite';
  document.body.style.height = '100vh';

}, [showBnavbar]);


  return (  showBnavbar ?
    <nav className="navbar" >
      <div className="navbar__container">
      <Link to="/" >   <img src={logo} alt="Foot" className="app-bar__image" />  </Link>
        <h1 className="navbar__logo">Foot Stats</h1>
        <div className="navbar__items">
          <Link to="/highlights" className="navbar__item">
            <button className="btn" style={{ color: 'white' }} >Highlights</button>
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
          <Link to="/Basket-Ball" className="navbar__item">
            <button className="btn" style={{ color: 'white' }} onClick={handleBLeaguesClick }>BasketBall</button>
          </Link>
        </div>
      </div>
    </nav> :
    <nav className="navbar" style={{ background: showBnavbar ? 'linear-gradient(-45deg, #02085e, #08007c, #0b0949, #0b0380)' : 'linear-gradient(-45deg, #5e2f02, #7c4600, #493309, #803f03)' }}>
    <div className="navbar__container">
     <Link to="/Basket-Ball">   <img src={basket} alt="Foot" className="app-bar__image"  width={100} height={100}/>  </Link>
       <h1 className="navbar__logo">Basket Stats</h1>
       <div className="navbar__items">
       <Link to="basket-ball/highlights" className="navbar__item">
            <button className="btn" style={{ color: 'white' }} >Highlights</button>
          </Link>
         <Link to="/basket-ball/standings" className="navbar__item">
           <button className="btn" style={{ color: 'white' }}>Standings</button>
         </Link>
         <Link to="/Basket-ball/games" className="navbar__item">
           <button className="btn" style={{ color: 'white' }}>Games</button>
         </Link>
         <Link to="/Basket-ball/Search" className="navbar__item">
           <button className="btn" style={{ color: 'white' }}>SearchAI</button>
         </Link>
         <Link to="/" className="navbar__item">
            <button className="btn" style={{ color: 'white' }} onClick={handleFLeaguesClick }>Football</button>
          </Link>
       </div>
     </div>
   </nav>
  );
}

export default Navbar;