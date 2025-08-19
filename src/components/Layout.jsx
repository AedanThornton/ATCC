import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import "../styles/layout.css"
import logo from "../assets/ATCC.svg"

function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <div className="app-layout">
      <header className="app-header">
        
        <div className='top-menu'>
          <nav className='layout-nav'>
            <button className='menu-button'><img src={logo} alt='Menu' width="40" height="40"/></button>
            <ul>
              <Link to="/home"><img src={logo} alt='Home' width="50" height="50"/></Link>
              <li><Link to="/catalog">Card Catalog</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
          </nav>
        </div>
        
        <h1>ATCC</h1>
        <div></div>
      </header>
      <main className="app">
        <Outlet />
      </main>
      {/*<footer className="app-footer">
        <p>Temp Footer</p>
      </footer>*/}
    </div>
  );
}

export default Layout;