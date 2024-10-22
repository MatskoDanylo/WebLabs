import React from 'react';
import './Header.css'; 

function Header() {
  return (
    <header>
      <img src="logo.png" alt="Logo" />
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/products">Pets</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
      <div className="signButtons">
        <a href="/login">Sign In</a>
        <a href="/register">Register</a>
      </div>
    </header>
  );
}

export default Header;
