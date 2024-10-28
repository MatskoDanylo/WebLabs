import React from 'react';
import './Footer.css';

function Footer() {
  return (
      <div id="main-content">
        <footer>
          <p>&copy; 2024 Pet Store. All rights reserved</p>
          <ul>
            <li><img src="facebook-icon.png" alt="Facebook" /></li>
            <li><img src="twitter-icon.png" alt="Twitter" /></li>
            <li><img src="instagram-icon.png" alt="Instagram" /></li>
          </ul>
        </footer>
      </div>
  );
}

export default Footer;
