import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import "../styles/layout.css"
import logo from "../assets/ATCC.svg"

function Layout() {
  return (
    <div className="app-layout">
      <header className="app-header">
        <nav className='layout-nav'>
          <Link to="/home"><img src={logo} alt='Home' width="50" height="50"/></Link>
          <ul>
            <li><Link to="/catalog">Card Catalog</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </nav>
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