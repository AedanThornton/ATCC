import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import "../styles/layout.css"
import logo from "../assets/ATCC.svg"
import FilterSidebar from './FilterSidebar';
import ControlBar from "./ControlBar";
import SearchBar from './SearchBar';

function Layout() {
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);

  return (
    <div className="app-layout">
      <header className="app-header">

        <div className="layout-row">
          <div className='top-menu'>
            <nav className='layout-nav'>
              <button className='menu-button'><img src={logo} alt='Menu' width="40" height="40"/>
                <div className='nav-sidebar'>
                  <ul>
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/catalog">Card Catalog</Link></li>
                    <li><Link to="/about">About</Link></li>
                  </ul>
                </div>
              </button>
            </nav>
          </div>
          
          <ControlBar />

          <div className='top-menu'>
            <div className='filters-menu'>
              <button className='filters-hamburger-button' onClick={() => setIsFilterSidebarOpen(!isFilterSidebarOpen)}>
                <div className='hamburger-bar'></div>
                <div className='hamburger-bar'></div>
                <div className='hamburger-bar'></div>
              </button>

              {isFilterSidebarOpen && <FilterSidebar />}
            </div>
          </div>
        </div>

        <SearchBar />
        
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