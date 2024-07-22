import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../index.scss";

const Navbar = () => {
  const location = useLocation();


  const handleLinkClick = () => {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarCollapse.classList.contains('show')) {
      navbarToggler.click();  
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/" onClick={handleLinkClick}><b><span>D</span>emBlogs</b></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link MyLink ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/" onClick={handleLinkClick}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link MyLink ${location.pathname === '/Blogs' ? 'active' : ''}`} to="/Blogs" onClick={handleLinkClick}>Blogs</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link MyLink ${location.pathname === '/AddBlogs' ? 'active' : ''}`} to="/AddBlogs" onClick={handleLinkClick}>Add Blogs</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
