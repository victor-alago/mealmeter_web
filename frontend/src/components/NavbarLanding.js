import React from 'react';
import '../assets/css/NavbarLanding.css'; // Make sure the path matches your project structure

const NavbarLanding = () => {
  return (
    <nav className="navbar">
      <div className="logo">MEALMETER</div>
      <ul className="menu">
        <li>About us</li>
        <li>Pricing</li>
        <li>Contact us</li>
      </ul>
      <button className="button">Get Started</button>
    </nav>
  );
};

export default NavbarLanding;
