import React from 'react';
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube, FaPinterest } from 'react-icons/fa';
import styles from '../assets/css/Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Newsletter Section */}
        <div className={styles.newsletterSection}>
          <h2 className={styles.newsletterTitle}>Don't Miss Out</h2>
          <p className={styles.newsletterDescription}>
            Register here for the latest updates, product features and exclusive offers!
          </p>
          
          <form className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className="sr-only">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter Your Email Address"
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="goal" className="sr-only">Your Goal</label>
              <select id="goal" className={styles.select}>
                <option value="" disabled selected>Select Your Goal</option>
                <option value="weight-gain">Weight Gain</option>
                <option value="weight-loss">Weight Loss</option>
                <option value="maintain">Staying in Shape</option>
              </select>
            </div>
            <button type="submit" className={styles.button}>
              SIGN UP
            </button>
          </form>
        </div>

        {/* Main Footer Links */}
        <div className={styles.linksGrid}>
          <div className={styles.linkSection}>
            <h3>Company</h3>
            <ul className={styles.linkList}>
              <li>About</li>
              <li>Experts and Teams</li>
              <li>Careers</li>
            </ul>
          </div>

          <div className={styles.linkSection}>
            <h3>Customer Service</h3>
            <ul className={styles.linkList}>
              <li>Contact Us</li>
              <li>My Account</li>
              <li>Partner Stores</li>
              <li>Redeem rewards</li>
            </ul>
          </div>

          <div className={styles.linkSection}>
            <h3>More to Explore</h3>
            <ul className={styles.linkList}>
              <li>Magazine</li>
              <li>Tools and Resources</li>
              <li>Offers</li>
            </ul>
          </div>

          <div className={styles.linkSection}>
            <h3>Connect With Us</h3>
            <div className={styles.socialLinks}>
              <span className={styles.socialIcon}><FaInstagram /></span>
              <span className={styles.socialIcon}><FaFacebookF /></span>
              <span className={styles.socialIcon}><FaTwitter /></span>
              <span className={styles.socialIcon}><FaYoutube /></span>
              <span className={styles.socialIcon}><FaPinterest /></span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.legalLinks}>
            <span>SITE MAP</span>
            <span>PRIVACY</span>
            <span>TERMS</span>
            <span>USER CONTENT PERMISSION TERMS</span>
          </div>
          <div className={styles.copyright}>
            <p>© {currentYear} mealmeter inc.</p>
            <button onClick={scrollToTop} className={styles.backToTop}>
              BACK TO TOP ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;