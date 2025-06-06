import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/homepage.css"

function HomePage() {
  return (
    <div className='home-page'>
      <h1><span>Welcome to the <i>Unofficial</i></span> <span><b>Aeon Trespass Card Catalog</b></span></h1>
      <nav className='main-nav'>
        <ul>
          <li><Link to="/catalog">Card Catalog</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default HomePage;