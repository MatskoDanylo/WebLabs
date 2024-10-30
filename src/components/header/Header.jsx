import React from 'react';
import { Link } from 'react-router-dom'; 
import './Header.css'; 

function Header() {
  return (
    <header>
      <img src="logo.png" alt="Logo" />
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/catalog">Catalog</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
      <div className="signButtons">
        <Link to="/login">Sign In</Link>
        <Link to="/register">Register</Link>
      </div>
    </header>
  );
}

export default Header;
