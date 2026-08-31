import { Link, Outlet } from 'react-router-dom';
import "../../styles/layout.css"
import logo from "../../assets/ATCC.svg"
import { useLayout } from '../../context/LayoutContext';
import getIcon from '../utils/iconUtils';
import { useState } from 'react';
import { useSavedSetsContext } from '../../context/SavedSetsContext';

function Layout({}) {
  const { layout } = useLayout()
  const [navOpen, setNavOpen] = useState(false)
  const { savedSetsOpen } = useSavedSetsContext()
  const isNotMobile = window.matchMedia('(hover: hover)').matches;

  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="layout-row">
          <div className='top-menu'>
            <nav className='layout-nav'>
              {!(savedSetsOpen && !isNotMobile) && <button className='menu-button'
                onPointerOver={() => setNavOpen(true)}
              >
                <img src={logo} alt='Menu' width="40" height="40"/>
                <div className='nav-sidebar' style={navOpen ? {display: "flex"} : {}} onPointerLeave={() => isNotMobile && setNavOpen(false)}>
                  <div className='nav-close-button' onClick={(e) => {e.stopPropagation; setNavOpen(false)}}>✖</div>
                  <ul>
                    <Link onClick={() => setNavOpen(false)} to="/home"><li>Home</li></Link>
                    <Link onClick={() => setNavOpen(false)} to="/catalog"><li>Card Catalog</li></Link>
                    <Link onClick={() => setNavOpen(false)} to="/search-info"><li>Catalog Docs</li></Link>
                    <Link onClick={() => setNavOpen(false)} to="/backpack"><li>{getIcon({name: "Backpack", invert: true})} Backpack</li></Link>
                    <Link onClick={() => setNavOpen(false)} to="/about"><li>About</li></Link>
                    <Link onClick={() => setNavOpen(false)} to="https://ko-fi.com/artifus" target="_blank" rel="noopener noreferrer"><li>Support Me <img src="https://storage.ko-fi.com/cdn/logomarkLogo.png" alt=' on Ko-fi' width="35" height="30" /></li></Link>
                  </ul>
                </div>
              </button>}
            </nav>
          </div>

          {layout?.topbar}
        </div>

        {layout?.main}
        
      </header>
      <main className="app">
        <Outlet />
      </main>
      <footer className="app-footer">
        <span>This site is fan-made, unofficial, and unaffiliated with Into the Unknown Studios</span>
      </footer>
    </div>
  );
}

export default Layout;