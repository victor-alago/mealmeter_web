// src/components/NavbarHome.js
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from '../assets/css/NavbarHome.module.css'; // Import CSS Module

const NavbarHome = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user authentication data (token, user details, etc.)
    localStorage.removeItem('token'); // Assuming token is stored in local storage
    // Navigate to login or home page
    navigate('/login', { replace: true }); // Replace the current entry in the history stack

    // Optionally, clear state if using Redux/Context or any other state management
    // dispatch({ type: 'LOGOUT' }); // If using Redux or similar
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>MEALMETER</div>
      <ul className={styles.menu}>
        <li className={styles.menuItem}>Search</li>
        <li className={styles.menuItem}>Tracking</li>
        <li className={styles.menuItem}>Setting</li>
      </ul>
      <button onClick={handleLogout} className={styles.button}>
        Logout
      </button>
    </nav>
  );
};

export default NavbarHome;