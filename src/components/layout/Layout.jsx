import { Link, Outlet } from 'react-router-dom';
import "../../styles/layout.css"
import logo from "../../assets/ATCC.svg"
import { useLayout } from '../../context/LayoutContext';

function Layout({}) {
  const { layout } = useLayout()

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
                    <li><Link to="/search-info">Catalog Docs</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="https://ko-fi.com/artifus" target="_blank" rel="noopener noreferrer">Support Me <img src="https://storage.ko-fi.com/cdn/logomarkLogo.png" alt=' on Ko-fi' width="35" height="30" /></Link></li>
                  </ul>
                </div>
              </button>
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