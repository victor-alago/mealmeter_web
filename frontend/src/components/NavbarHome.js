import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from '../assets/css/NavbarHome.module.css'; // Import CSS Module

const NavbarHome = () => {
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Assuming token is stored in local storage
    navigate('/login', { replace: true }); // Replace the current entry in the history stack
  };

  return (
    <nav className={styles.navbar}>
      {/* Make the logo a link to the /dashboard */}
      <Link to="/dashboard" className={styles.logo}>
        MEALMETER
      </Link>
      <ul className={styles.menu}>
        <li className={styles.menuItem}>
          <Link to="/search" className={styles.menuItem}>
            Search
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link to="/log-food" className={styles.menuItem}>
            Log Food
          </Link>
        </li>
        <li className={styles.menuItem}>Tracking</li>
        <li
          className={`${styles.menuItem} ${showSettings ? styles.active : ''}`} // Add active class dynamically
          onClick={() => setShowSettings(!showSettings)}
        >
          Settings
          {showSettings && (
            <ul className={styles.dropdownMenu}>
              <li>
                <Link to="/profile" className={styles.dropdownItem}>
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/preferences" className={styles.dropdownItem}>
                  Preferences
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
      <button onClick={handleLogout} className={styles.button}>
        Logout
      </button>
    </nav>
  );
};

export default NavbarHome;