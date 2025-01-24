import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/NavbarLanding.css';

const NavbarLanding = () => {
  return (
    <nav className="navbar">
      <div className="logo">MEALMETER</div>
      <ul className="menu">
        <li>About us</li>
        <li>Pricing</li>
        <li>Contact us</li>
      </ul>
      <Link to="/login" className="button">Get Started</Link>
    </nav>
  );
};

export default NavbarLanding;
