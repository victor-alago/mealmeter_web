import React from 'react';
import NavbarLanding from '../components/NavbarLanding';
import '../assets/css/LandingPage.css';

const LandingPage = () => {
    return (
      <div className="landing-page">
        <NavbarLanding />
        <div className="content-wrapper">
          <div className="text-section">
            <h1>Meet MealMeter, your nutrition coach</h1>
            <p>With MealMeter nutrition app, you get a personalized nutrition tracker that makes you life easier</p>
            <div className="app-buttons">
              <a href="" target="_blank" rel="noopener noreferrer">
                <img src={require("../assets/app-store-badge.png")} alt="Download on the App Store" />
              </a>
              <a href="" target="_blank" rel="noopener noreferrer">
                <img src={require("../assets/google-play-badge.png")} alt="Get it on Google Play" />
              </a>
            </div>
          </div>
          <div className="image-section">
            <img src={require("../assets/iphone.webp")} alt="Phone" />
          </div>
        </div>
      </div>
    );
  };
  
  export default LandingPage;
